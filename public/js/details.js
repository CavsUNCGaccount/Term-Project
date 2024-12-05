document.addEventListener('DOMContentLoaded', () => {
    // Add event listener for "Add to Cart" button
    document.querySelector('.add-to-cart').addEventListener('click', () => {
        const productId = document.querySelector('.add-to-cart').getAttribute('data-id');

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
    });
});
