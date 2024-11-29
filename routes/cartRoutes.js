const express = require('express');
const router = express.Router();
const cartModel = require('../models/cartModel');

// Create a new cart for a user
// http://localhost:3000/api/carts
router.post('/', (req, res) => {
    const { user_id, status } = req.body;
    try {
        console.log('Request to create a new cart:', req.body);
        const cart = {
            user_id,
            status
        };
        const result = cartModel.createCart(cart);
        res.status(201).json({ message: 'Cart created successfully', cartId: result.lastInsertRowid });
    } catch (err) {
        console.error('Error creating cart:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all carts for a user
// http://localhost:3000/api/carts/1 (1 is the user ID number)
router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    try {
        console.log(`Request to get all carts for user ID: ${userId}`);
        const carts = cartModel.getCartsByUserId(userId);
        if (carts && carts.length > 0) {
            res.status(200).json(carts);
        } else {
            res.status(404).json({ error: 'No carts found for the user' });
        }
    } catch (err) {
        console.error('Error retrieving carts:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a cart by ID
// http://localhost:3000/api/carts/3 (3 is the cart ID number)
router.put('/:id', (req, res) => {
    const cartId = req.params.id;
    const { status } = req.body;

    console.log(`Request to update cart with ID: ${cartId}`, req.body);  // Log incoming request

    try {
        const cart = { status };
        console.log('Cart to be updated:', cart); // Log the cart object before updating

        // Call the model function to update the cart
        const result = cartModel.updateCart(cartId, cart);

        if (result.changes > 0) {
            console.log(`Cart with ID ${cartId} updated successfully`);
            res.status(200).json({ message: 'Cart updated successfully' });
        } else {
            console.log(`Cart with ID ${cartId} not found`);  // Log if cart not found
            res.status(404).json({ error: 'Cart not found' });
        }
    } catch (err) {
        console.error('Error updating cart:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a cart by ID
// http://localhost:3000/api/carts/1 (1 is the cart ID number)
router.delete('/:cartId', (req, res) => {
    const cartId = req.params.cartId;
    try {
        console.log(`Request to delete cart with ID: ${cartId}`);
        const result = cartModel.deleteCart(cartId);
        if (result.changes > 0) {
            res.status(200).json({ message: 'Cart deleted successfully' });
        } else {
            res.status(404).json({ error: 'Cart not found' });
        }
    } catch (err) {
        console.error('Error deleting cart:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
