document.addEventListener('DOMContentLoaded', () => {
    const consoleContainer = document.getElementById('console-products');
    const gamesContainer = document.getElementById('game-products');
    const accessoriesContainer = document.getElementById('accessories-products');
    const decorContainer = document.getElementById('decor-products');

    // Debug to ensure containers are found correctly
    console.log('Console container:', consoleContainer);
    console.log('Games container:', gamesContainer);
    console.log('Accessories container:', accessoriesContainer);
    console.log('Decor container:', decorContainer);

    const productsContainerMapping = {
        1: consoleContainer,
        2: gamesContainer,
        3: accessoriesContainer,
        4: decorContainer
    };

    // Fetch products from the API
    fetch('/api/products')
        .then(response => {
            console.log('Response status:', response.status);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            return response.json();
        })
        .then(products => {
            console.log('Fetched products:', products);

            products.forEach(product => {
                console.log('Processing product:', product);
                console.log('Product fields:', Object.keys(product));  // Log all keys to check what's available
                console.log('Category ID:', product.Category_Id);      // Update to match capitalized field name

                const categoryContainer = productsContainerMapping[product.Category_Id]; // Updated field name

                if (categoryContainer) {
                    const productItem = document.createElement('div');
                    productItem.classList.add('product-item');

                    productItem.innerHTML = `
                        <figure>
                            <img src="${product.Image_Url}" alt="${product.Name}" class="product-image">
                            <figcaption>
                                <h4>${product.Name}</h4>
                                <p>$${product.Price.toFixed(2)}</p>
                            </figcaption>
                        </figure>
                        <a href="/products/details/${product.Id}" class="details-link">View Details</a>
                        <button class="add-to-cart" data-id="${product.Id}">Add to Cart</button>
                    `;

                    console.log('Adding product to category:', product.Category_Id);
                    categoryContainer.appendChild(productItem);
                } else {
                    console.error('No category container found for product:', product);
                }
            });

            // Add click event listeners to "Add to Cart" buttons
            const addToCartButtons = document.querySelectorAll('.add-to-cart');
            addToCartButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const productId = button.getAttribute('data-id');
                    addToCart(productId);
                });
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });

    // Function to add a product to the cart
    function addToCart(productId) {
        fetch('/api/cart-products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ product_id: productId, quantity: 1 }) // Set quantity to 1 for now
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);
            } else {
                alert('Failed to add product to cart. Please try again.');
            }
        })
        .catch(err => {
            console.error('Error adding product to cart:', err);
            alert('Error adding product to cart. Please try again.');
        });
    }
});