document.addEventListener('DOMContentLoaded', () => {
    // Select all "Update" buttons and listen for clicks
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', handleQuantityChange);
    });

    // Select all "Remove" buttons and listen for clicks
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', handleRemoveProduct);
    });

    // Handle quantity changes for products in the cart
    function handleQuantityChange(event) {
        const input = event.target;
        const newQuantity = input.value;
        const productId = input.closest('tr').querySelector('.remove-btn').dataset.id;

        if (newQuantity < 1) {
            alert('Quantity must be at least 1.');
            return;
        }

        fetch(`/api/cart-products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity: newQuantity })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert('Error updating quantity: ' + data.error);
            } else {
                // Reload the page to reflect changes
                window.location.reload();
            }
        })
        .catch(error => {
            console.error('Error updating product quantity:', error);
        });
    }

    // Handle removing a product from the cart
    function handleRemoveProduct(event) {
        event.preventDefault();

        const productId = event.target.dataset.id;

        fetch(`/api/cart-products/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert('Error removing product: ' + data.error);
            } else {
                // Reload the page to reflect changes
                window.location.reload();
            }
        })
        .catch(error => {
            console.error('Error removing product from cart:', error);
        });
    }
});