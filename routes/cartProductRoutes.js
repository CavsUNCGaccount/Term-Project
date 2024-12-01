const express = require('express');
const router = express.Router();
const cartProductModel = require('../models/cartProductModel');
const cartModel = require('../models/cartModel');

// Get all products in the cart
// http://localhost:3000/api/cart-products
router.get('/', (req, res) => {
    try {
        console.log(`Request to get all products in the active cart`);

        // Get the active cart
        const cart = cartModel.getActiveCart();

        if (!cart) {
            console.log(`No active cart found`);
            return res.status(404).json({ error: 'No active cart found' });
        }

        // Get all products in the active cart
        const cartProducts = cartProductModel.getCartProductsByCartId(cart.Id);
        if (cartProducts && cartProducts.length > 0) {
            res.status(200).json(cartProducts);
        } else {
            console.log(`No products found in the cart with ID: ${cart.Id}`);
            res.status(404).json({ error: 'No products found in the cart' });
        }
    } catch (err) {
        console.error('Error retrieving cart products:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add a product to the cart
router.post('/', async (req, res) => {
    const { product_id, quantity } = req.body;

    try {
        console.log(`Adding product to the cart with product ID: ${product_id}, quantity: ${quantity}`);

        // Get or create an active cart
        let cart = await cartModel.getActiveCart();

        if (!cart) {
            const newCart = {
                status: 'new',
                date_created: new Date().toISOString()
            };
            const createCartResult = await cartModel.createCart(newCart);

            if (createCartResult.changes > 0) {
                cart = await cartModel.getActiveCart(); // Fetch the newly created cart
            } else {
                return res.status(500).json({ error: 'Failed to create a new cart' });
            }
        }

        console.log('Cart after creation or retrieval:', cart);

        // Add product to the active cart
        const cartProduct = {
            cart_id: cart.Id,
            product_id,
            quantity
        };
        await cartProductModel.addCartProduct(cartProduct);

        res.status(201).json({ message: 'Product added to cart successfully' });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a product from the cart
// http://localhost:3000/api/cart-products/1 (1 is the cart product ID)
router.delete('/:id', (req, res) => {
    const cartProductId = req.params.id;
    try {
        console.log(`Request to delete product from cart with cart-product ID: ${cartProductId}`);
        const result = cartProductModel.deleteCartProduct(cartProductId);
        if (result.changes > 0) {
            res.status(200).json({ message: 'Cart product deleted successfully' });
        } else {
            console.log(`Cart product with ID ${cartProductId} not found`);
            res.status(404).json({ error: 'Cart product not found' });
        }
    } catch (err) {
        console.error('Error deleting cart product:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
