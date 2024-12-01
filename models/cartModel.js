const db = require('../db');

// Function to create a new cart
async function createCart(cart) {
    const statement = db.prepare(`
        INSERT INTO Carts (Status, Date_Created) VALUES (?, ?)
    `);
    const currentDate = new Date().toISOString();
    return statement.run(cart.status, currentDate);
}  

// Function to get the active cart
async function getActiveCart() {
    const statement = db.prepare(`
        SELECT * FROM Carts
        WHERE Status = 'new'
    `);
    return statement.get(); // Using `.get()` since we expect only one active cart
}

// Function to update the cart
async function updateCart(cartId, cart) {
    const statement = db.prepare(`
        UPDATE Carts
        SET Status = ?
        WHERE Id = ?
    `);
    return statement.run(cart.status, cartId);
}

// Function to delete the cart
async function deleteCart(cartId) {
    const statement = db.prepare(`
        DELETE FROM Carts 
        WHERE Id = ?
    `);
    return statement.run(cartId);
}

module.exports = {
    createCart,
    getActiveCart,
    updateCart,
    deleteCart
};
