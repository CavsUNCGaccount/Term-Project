const express = require('express');
const router = express.Router();
const productModel = require('../models/productModel');

// Get all products
// http://localhost:3000/api/products
router.get('/products', async (req, res) => {
  try {
      console.log('Fetching products from the database...');
      const products = await productModel.getAllProducts();
      console.log('Fetched products:', products);

      // Assuming user information is in req.user (like from passport)
      const user = req.user || null;
      const isAdmin = user && user.role === 'admin'; // Assuming the `role` field determines if the user is an admin

      if (products && products.length > 0) {
          res.render('products', { products, user, isAdmin });
      } else {
          console.log('No products found.');
          res.render('products', { products: [], user, isAdmin });
      }
  } catch (err) {
      console.error('Error fetching products:', err);
      res.status(500).send('Server error');
  }
});

// Get product by ID
// http://localhost:3000/api/products/1 (1 is the id number)
router.get('/:id', async (req, res) => {
  console.log(`API request for product with id: ${req.params.id}`);
  try {
    const product = await productModel.getProductById(req.params.id);
    if (product) {
      res.json(product); // Ensure JSON response here
    } else {
      res.status(404).send('Product not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Add a new product
// http://localhost:3000/api/products
router.post('/', (req, res) => {
  const { name, description, image_url, price, stock, category_id, featured_status } = req.body;
  try {
      console.log('Request to add a new product:', req.body);
      const product = {
          name,
          description,
          image_url,
          price,
          stock,
          category_id,
          featured_status
      };
      const result = productModel.addProduct(product);
      res.status(201).json({ message: 'Product added successfully', productId: result.lastInsertRowid });
  } catch (err) {
      console.error('Error adding product:', err);
      res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a product by ID
// http://localhost:3000/api/products/1 (1 is the id number)
router.put('/:id', (req, res) => {
  const productId = req.params.id;
  const { name, description, image_url, price, stock, category_id, featured_status } = req.body;
  try {
      console.log(`Request to update product with ID: ${productId}`, req.body);
      const product = {
          name,
          description,
          image_url,
          price,
          stock,
          category_id,
          featured_status
      };
      const result = productModel.updateProduct(productId, product);
      if (result.changes > 0) {
          res.status(200).json({ message: 'Product updated successfully' });
      } else {
          res.status(404).json({ error: 'Product not found' });
      }
  } catch (err) {
      console.error('Error updating product:', err);
      res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a product by ID
// http://localhost:3000/api/products/1 (1 is the id number)
router.delete('/:id', (req, res) => {
  const productId = req.params.id;
  try {
      console.log(`Request to delete product with ID: ${productId}`);
      const result = productModel.deleteProduct(productId);
      if (result.changes > 0) {
          res.status(200).json({ message: 'Product deleted successfully' });
      } else {
          res.status(404).json({ error: 'Product not found' });
      }
  } catch (err) {
      console.error('Error deleting product:', err);
      res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
