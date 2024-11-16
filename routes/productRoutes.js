const express = require('express');
const router = express.Router();

// GET all products
// http://localhost:3000/api/products
router.get('/products', (req, res) => {
  res.json({ message: 'This will return all products' });
});

// POST to create a product
// http://localhost:3000/api/products
router.post('/products', (req, res) => {
  res.json({ message: 'This will create a new product' });
});

// PUT to update a product
// http://localhost:3000/api/products/1 (1 is the product number, change number for another product number)
router.put('/products/:id', (req, res) => {
  res.json({ message: `This will update product with ID: ${req.params.id}` });
});

// DELETE a product
// http://localhost:3000/api/products/1 (1 is the product number)
router.delete('/products/:id', (req, res) => {
  res.json({ message: `This will delete product with ID: ${req.params.id}` });
});

module.exports = router;
