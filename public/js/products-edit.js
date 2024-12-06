document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.admin-edit-form');
    
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission

        const productId = document.getElementById('product-id').value;
        const updatedProduct = {
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            category_id: document.getElementById('category-id').value,
            price: parseFloat(document.getElementById('price').value),
            stock: parseInt(document.getElementById('stock').value),
            image_url: document.getElementById('image').value
        };

        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });

            if (response.ok) {
                alert('Product updated successfully');
                // Optionally redirect to another page or reload the page
                window.location.href = '/admin/products';
            } else {
                alert('Failed to update product');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Error updating product');
        }
    });
});
