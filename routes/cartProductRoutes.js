const express = require('express');
const router = express.Router();
const cartProductModel = require('../models/cartProductModel');

// Get all products in a cart
// http://localhost:3000/api/cart-products/1 (1 is the cart ID number)
router.get('/:cartId', (req, res) => {
    const cartId = req.params.cartId;
    try {
        console.log(`Request to get all products in cart ID: ${cartId}`);
        const cartProducts = cartProductModel.getCartProductsByCartId(cartId);
        if (cartProducts && cartProducts.length > 0) {
            res.status(200).json(cartProducts);
        } else {
            console.log(`No products found in cart with ID: ${cartId}`);
            res.status(404).json({ error: 'No products found in the cart' });
        }
    } catch (err) {
        console.error('Error retrieving cart products:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add a product to a cart
// http://localhost:3000/api/cart-products
router.post('/', (req, res) => {
    const { cart_id, product_id, quantity } = req.body;
    try {
        console.log('Request to add a product to cart:', req.body);
        const cartProduct = { cart_id, product_id, quantity };
        const result = cartProductModel.addCartProduct(cartProduct);
        res.status(201).json({ message: 'Product added to cart successfully', cartProductId: result.lastInsertRowid });
    } catch (err) {
        console.error('Error adding product to cart:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * Update product quantity in a cart
 * Endpoint to update the quantity of a specific product in a cart, 
 * identified by the cart-product ID (e.g., 1 refers to the cart-product with ID 1)
 * http://localhost:3000/api/cart-products/1
 */  
router.put('/:id', (req, res) => {
    const cartProductId = req.params.id;
    const { quantity } = req.body;
    try {
        console.log(`Request to update product quantity in cart-product ID: ${cartProductId}`, req.body);
        const result = cartProductModel.updateCartProductQuantity(cartProductId, quantity);
        if (result.changes > 0) {
            res.status(200).json({ message: 'Cart product updated successfully' });
        } else {
            console.log(`Cart product with ID ${cartProductId} not found`);
            res.status(404).json({ error: 'Cart product not found' });
        }
    } catch (err) {
        console.error('Error updating cart product:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a product from a cart
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
