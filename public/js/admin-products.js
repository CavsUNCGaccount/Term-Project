document.addEventListener('DOMContentLoaded', () => {
    // Delete button functionality
    document.querySelectorAll('.delete').forEach(button => {
        button.addEventListener('click', async () => {
            const productId = button.closest('tr').querySelector('td').textContent.trim();
            try {
                const response = await fetch(`/api/products/${productId}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    alert('Product deleted successfully');
                    // Reload the page to update the product list
                    window.location.reload();
                } else {
                    alert('Failed to delete product');
                }
            } catch (err) {
                console.error('Error deleting product:', err);
                alert('Error deleting product');
            }
        });
    });

    // Edit button functionality - Redirects to edit page with product ID
    document.querySelectorAll('.edit').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.closest('tr').querySelector('td').textContent.trim();
            window.location.href = `/admin/products/edit/${productId}`;
        });
    });
});