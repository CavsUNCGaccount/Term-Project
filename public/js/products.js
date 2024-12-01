document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        console.log('Add to Cart button clicked'); 
        const productId = button.getAttribute('data-id');
        fetch('/api/cart-products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product_id: productId,
                quantity: 1
            })
        })
        .then(response => {
            if (response.ok) {
                alert('Product added to cart successfully!');
            } else {
                alert('Failed to add product to cart. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error adding product to cart. Please try again.');
        });
    });
});
