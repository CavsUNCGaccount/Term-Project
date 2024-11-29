const db = require('../db');

// Get user by email
function getUserByEmail(email) {
    const statement = db.prepare('SELECT * FROM Users WHERE Email = ?');
    return statement.get(email);
}

// Add a new user
function addUser(user) {
    const statement = db.prepare(`
        INSERT INTO Users (Name, Email, User_Role)
        VALUES (?, ?, ?)
    `);
    return statement.run(user.name, user.email, user.user_role);
}

module.exports = {
    getUserByEmail,
    addUser
};
