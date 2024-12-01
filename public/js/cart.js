document.addEventListener('DOMContentLoaded', () => {
    // Select all quantity inputs
    const quantityInputs = document.querySelectorAll('.quantity-input');
    const removeButtons = document.querySelectorAll('.remove-btn');
    const clearCartButton = document.querySelector('.update-cart');
    const continueShoppingButton = document.querySelector('.continue-shopping');
    const checkoutButton = document.querySelector('.checkout');

    // Update cart when quantity changes
    quantityInputs.forEach(input => {
        input.addEventListener('change', () => {
            const productId = input.dataset.productId;
            const newQuantity = input.value;
            updateCartProductQuantity(productId, newQuantity);
        });
    });

    // Remove item from cart
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            removeProductFromCart(productId);
        });
    });

    // Clear cart
    if (clearCartButton) {
        clearCartButton.addEventListener('click', () => {
            clearCart();
        });
    }

    // Redirect to products page when clicking continue shopping
    if (continueShoppingButton) {
        continueShoppingButton.addEventListener('click', () => {
            window.location.href = '/products';
        });
    }

    // Proceed to checkout
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            window.location.href = '/checkout';
        });
    }
});

// Function to update product quantity in cart
function updateCartProductQuantity(productId, quantity) {
    fetch(`/api/cart-products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            console.log('Product quantity updated successfully:', data);
            window.location.reload(); // Reload to reflect changes
        } else {
            console.error('Failed to update product quantity:', data.error);
        }
    })
    .catch(err => console.error('Error:', err));
}

// Function to remove product from cart
function removeProductFromCart(productId) {
    fetch(`/api/cart-products/${productId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            console.log('Product removed from cart successfully:', data);
            window.location.reload(); // Reload to reflect changes
        } else {
            console.error('Failed to remove product from cart:', data.error);
        }
    })
    .catch(err => console.error('Error:', err));
}

// Function to clear the entire cart
function clearCart() {
    fetch('/api/carts/clear', {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            console.log('Cart cleared successfully:', data);
            window.location.reload(); // Reload to reflect changes
        } else {
            console.error('Failed to clear cart:', data.error);
        }
    })
    .catch(err => console.error('Error:', err));
}
