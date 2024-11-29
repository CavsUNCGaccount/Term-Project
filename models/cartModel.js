const db = require('../db');

// Function to create a new cart
function createCart(cart) {
  const statement = db.prepare(`
      INSERT INTO Carts (User_Id, Status, Date_Created) VALUES (?, ?, ?)
  `);
  const currentDate = new Date().toISOString();
  return statement.run(cart.user_id, cart.status, currentDate);
}

// Function to get carts by user ID
function getCartsByUserId(userId) {
    const statement = db.prepare(`
        SELECT * FROM Carts 
        WHERE User_Id = ?
    `);
    return statement.all(userId);
}

// Function to update a cart by ID
function updateCart(cartId, cart) {
  const statement = db.prepare(`
      UPDATE Carts
      SET Status = ?
      WHERE Id = ?
  `);
  // Make sure to pass both 'status' and 'cartId' as parameters
  return statement.run(cart.status, cartId);
}

// Function to delete a cart by ID
function deleteCart(cartId) {
    const statement = db.prepare(`
        DELETE FROM Carts 
        WHERE Id = ?
    `);
    return statement.run(cartId);
}

module.exports = {
    createCart,
    getCartsByUserId,
    updateCart,
    deleteCart
};
