document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('productsContainer');

    // Fetch all products from the server
    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            if (products.length > 0) {
                products.forEach(product => {
                    const productCard = `
                        <div class="product-card">
                            <img src="${product.Image_Url}" alt="${product.Name}">
                            <h3>${product.Name}</h3>
                            <p>Price: $${product.Price}</p>
                             <p>Stock: ${product.Stock}</p> 
                            <button class="add-to-cart" data-id="${product.Id}">Add to Cart</button>
                        </div>`;
                    productsContainer.innerHTML += productCard;
                });

                // Add click event listeners to "Add to Cart" buttons
                const addToCartButtons = document.querySelectorAll('.add-to-cart');
                addToCartButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const productId = button.getAttribute('data-id');
                        addToCart(productId);
                    });
                });
            } else {
                productsContainer.innerHTML = '<p>No products available at the moment.</p>';
            }
        })
        .catch(err => {
            console.error('Error fetching products:', err);
            productsContainer.innerHTML = '<p>Unable to load products at the moment. Please try again later.</p>';
        });
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