const express = require('express');
const router = express.Router();
const cartModel = require('../models/cartModel');

// Get the single active cart
// GET http://localhost:3000/api/cart
router.get('/', async (req, res) => {
    console.log('GET /api/cart - Fetching the active cart');
    try {
        const cart = await cartModel.getActiveCart();
        if (cart) {
            console.log('Cart fetched:', cart);
            res.status(200).json(cart);
        } else {
            console.log('No active cart found');
            res.status(404).json({ error: 'No active cart found' });
        }
    } catch (err) {
        console.error('Error fetching the cart:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create or get the single active cart
// POST http://localhost:3000/api/cart
router.post('/', async (req, res) => {
    console.log('POST /api/cart - Creating or fetching the active cart');
    try {
        let cart = await cartModel.getActiveCart();
        if (!cart) {
            const newCart = {
                status: 'new',
                date_created: new Date().toISOString()
            };
            const result = await cartModel.createCart(newCart);
            cart = await cartModel.getActiveCart();
            console.log('New cart created:', cart);
        } else {
            console.log('Cart already exists:', cart);
        }
        res.status(200).json(cart);
    } catch (err) {
        console.error('Error creating/fetching the cart:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update the cart status (e.g., to 'purchased')
// PUT http://localhost:3000/api/cart
router.put('/', async (req, res) => {
    console.log('PUT /api/cart - Updating cart status');
    const { status } = req.body;
    try {
        let cart = await cartModel.getActiveCart();
        if (cart) {
            const updatedCart = { status };
            const result = await cartModel.updateCart(cart.Id, updatedCart);
            if (result.changes > 0) {
                console.log('Cart updated successfully');
                res.status(200).json({ message: 'Cart updated successfully' });
            } else {
                console.log('Failed to update the cart');
                res.status(500).json({ error: 'Failed to update the cart' });
            }
        } else {
            console.log('No active cart found');
            res.status(404).json({ error: 'No active cart found' });
        }
    } catch (err) {
        console.error('Error updating the cart:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete the cart (if needed for reset purposes)
// DELETE http://localhost:3000/api/cart
router.delete('/', async (req, res) => {
    console.log('DELETE /api/cart - Deleting the active cart');
    try {
        const cart = await cartModel.getActiveCart();
        if (cart) {
            const result = await cartModel.deleteCart(cart.Id);
            if (result.changes > 0) {
                console.log('Cart deleted successfully');
                res.status(200).json({ message: 'Cart deleted successfully' });
            } else {
                console.log('Failed to delete the cart');
                res.status(500).json({ error: 'Failed to delete the cart' });
            }
        } else {
            console.log('No active cart found to delete');
            res.status(404).json({ error: 'No active cart found' });
        }
    } catch (err) {
        console.error('Error deleting the cart:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
