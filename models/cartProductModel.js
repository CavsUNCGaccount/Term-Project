const db = require('../db');

// Function to get all products in the general cart by cart ID
function getCartProductsByCartId(cartId) {
    const statement = db.prepare(`
        SELECT * FROM CartProducts
        WHERE Cart_Id = ?
    `);
    return statement.all(cartId);
}

// Function to add a new product to the general cart
function addCartProduct(cartProduct) {
    const statement = db.prepare(`
        INSERT INTO CartProducts (Cart_Id, Product_Id, Quantity)
        VALUES (?, ?, ?)
    `);
    return statement.run(cartProduct.cart_id, cartProduct.product_id, cartProduct.quantity);
}

// Function to get a product by cart ID and product ID
function getCartProductByCartAndProductId(cartId, productId) {
    const statement = db.prepare(`
        SELECT * FROM CartProducts
        WHERE Cart_Id = ? AND Product_Id = ?
    `);
    return statement.get(cartId, productId);
}

// Function to update product quantity in the general cart
function updateCartProductQuantity(cartProductId, quantity) {
    const statement = db.prepare(`
        UPDATE CartProducts
        SET Quantity = ?
        WHERE Id = ?
    `);
    return statement.run(quantity, cartProductId);
}

// Function to delete a product from the general cart by cart-product ID
function deleteCartProduct(cartProductId) {
    const statement = db.prepare(`
        DELETE FROM CartProducts
        WHERE Id = ?
    `);
    return statement.run(cartProductId);
}

module.exports = {
    getCartProductsByCartId,
    addCartProduct,
    getCartProductByCartAndProductId,
    updateCartProductQuantity,
    deleteCartProduct
};