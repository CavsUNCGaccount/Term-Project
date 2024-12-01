const express = require('express');
const router = express.Router();
const productModel = require('../models/productModel');

// Get all products
// GET http://localhost:3000/api/products
router.get('/', async (req, res) => {
    console.log('GET /api/products - Fetching all products');
    try {
        const products = productModel.getAllProducts();
        console.log('Fetched products:', products);
        res.status(200).json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get a single product by ID
// GET http://localhost:3000/api/products/:id
router.get('/:id', async (req, res) => {
    const productId = req.params.id;
    console.log(`GET /api/products/${productId} - Fetching single product`);

    try {
        const product = await productModel.getProductById(productId);
        if (product) {
            console.log('Product found:', product);
            res.status(200).json(product);
        } else {
            console.log(`Product with ID ${productId} not found`);
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (err) {
        console.error('Error fetching product:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add a new product (Admin only)
// POST http://localhost:3000/api/products
router.post('/', async (req, res) => {
    console.log("Received a POST request to /api/products");
    console.log('POST /api/products - Creating a new product');
    console.log('Request body:', req.body);
    try {
        const { name, description, image_url, price, stock, category_id, featured_status } = req.body;

        const product = {
            name,
            description,
            image_url,
            price,
            stock,
            category_id,
            featured_status
        };

        console.log('Product to be created:', product);
        const result = await productModel.createProduct(product);
        console.log('Product created successfully, ID:', result.lastInsertRowid);
        res.status(201).json({ message: 'Product created successfully', productId: result.lastInsertRowid });
    } catch (err) {
        console.error('Error creating product:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a product (Admin only)
// PUT http://localhost:3000/api/products/:id
router.put('/:id', async (req, res) => {
    const productId = req.params.id;
    console.log(`PUT /api/products/${productId} - Updating product`);
    console.log('Request body:', req.body);

    const { name, description, category_id, price, stock, image_url } = req.body;

    try {
        const updatedProduct = {
            name,
            description,
            category_id,
            price,
            stock,
            image_url
        };
        console.log('Updated product data:', updatedProduct);
        const result = await productModel.updateProduct(productId, updatedProduct);
        if (result.changes > 0) {
            console.log('Product updated successfully');
            res.status(200).json({ message: 'Product updated successfully' });
        } else {
            console.log('Product not found for update');
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a product (Admin only)
// DELETE http://localhost:3000/api/products/:id
router.delete('/:id', async (req, res) => {
    const productId = req.params.id;
    console.log(`DELETE /api/products/${productId} - Deleting product`);

    try {
        const result = await productModel.deleteProduct(productId);
        if (result.changes > 0) {
            console.log('Product deleted successfully');
            res.status(200).json({ message: 'Product deleted successfully' });
        } else {
            console.log('Product not found for deletion');
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
