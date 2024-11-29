const db = require('../db');

// Function to get all products
const getAllProducts = () => {
    try {
        const statement = db.prepare('SELECT * FROM Products');
        const products = statement.all();
        return products; // This should be an array of products
    } catch (err) {
        console.error('Error fetching products:', err);
        throw err;
    }
};

// Function to get product by ID
function getProductById(productId) {
    const statement = db.prepare('SELECT * FROM Products WHERE Id = ?');
    return statement.get(productId);
}

// Function to add a new product
function addProduct(product) {
    const statement = db.prepare(`
        INSERT INTO Products (Name, Description, Image_url, Price, Stock, Category_Id, Featured_Status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    return statement.run(
        product.name,
        product.description,
        product.image_url,
        product.price,
        product.stock,
        product.category_id,
        product.featured_status
    );
}

// Function to update a product
function updateProduct(productId, product) {
    const statement = db.prepare(`
        UPDATE Products
        SET Name = ?, Description = ?, Image_url = ?, Price = ?, Stock = ?, Category_Id = ?, Featured_Status = ?
        WHERE Id = ?
    `);
    return statement.run(
        product.name,
        product.description,
        product.image_url,
        product.price,
        product.stock,
        product.category_id,
        product.featured_status,
        productId
    );
}

// Function to delete a product
function deleteProduct(productId) {
    const statement = db.prepare('DELETE FROM Products WHERE Id = ?');
    return statement.run(productId);
}

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
};
