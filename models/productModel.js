const db = require('../db');

// Function to get all products
function getAllProducts() {
    const statement = db.prepare(`
        SELECT * FROM Products
    `);
    return statement.all();
}

// Function to get a single product by ID
async function getProductById(productId) {
    const statement = db.prepare(`
        SELECT * FROM Products
        WHERE Id = ?
    `);
    return statement.get(productId); // Use `.get` to return a single product
}

// Function to create a new product
function createProduct(product) {
    const statement = db.prepare(`
        INSERT INTO Products (Name, Description, Category_Id, Price, Stock, Image_Url)
        VALUES (?, ?, ?, ?, ?, ?)
    `);
    return statement.run(
        product.name,
        product.description,
        product.category_id,
        product.price,
        product.stock,
        product.image_url
    );
}

// Function to update an existing product by ID
function updateProduct(productId, product) {
    const statement = db.prepare(`
        UPDATE Products
        SET Name = ?, Description = ?, Category_Id = ?, Price = ?, Stock = ?, Image_Url = ?
        WHERE Id = ?
    `);
    return statement.run(
        product.name,
        product.description,
        product.category_id,
        product.price,
        product.stock,
        product.image_url,
        productId
    );
}

// Function to delete a product by ID
function deleteProduct(productId) {
    const statement = db.prepare(`
        DELETE FROM Products
        WHERE Id = ?
    `);
    return statement.run(productId);
}

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById
};