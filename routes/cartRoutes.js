const express = require('express');
const router = express.Router();

// GET all carts
// http://localhost:3000/api/carts
router.get('/', (req, res) => {
    res.json({ message: 'This will return all carts' });
});

// POST to create a cart
// http://localhost:3000/api/carts
router.post('/', (req, res) => {
    res.json({ message: 'This will create a new cart' });
});

// PUT to update a cart
// http://localhost:3000/api/carts/:id
router.put('/:id', (req, res) => {
    res.json({ message: `This will update cart with ID: ${req.params.id}` });
});

// DELETE a cart
// http://localhost:3000/api/carts/:id
router.delete('/:id', (req, res) => {
    res.json({ message: `This will delete cart with ID: ${req.params.id}` });
});

module.exports = router;
