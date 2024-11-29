const express = require('express');
const passport = require('passport');
const db = require('../db'); // Make sure the db connection is available
const router = express.Router();

// Admin emails defined from the environment
const adminEmails = [process.env.ADMIN_EMAIL];

// Route to initiate Google authentication
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'], 
    prompt: 'select_account'  // Force the account selection screen each time
}));

// Callback route after Google authentication
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/sign-up'
}), (req, res) => {
    // Here is where we'll implement the logic for assigning user roles
    const { displayName, emails } = req.user;
    const email = emails[0].value;

    // Determine if the user is an admin
    const role = adminEmails.includes(email) ? 'Admin' : 'Shopper';

    // Check if the user already exists in the database
    const existingUser = db.prepare('SELECT * FROM Users WHERE Email = ?').get(email);

    if (!existingUser) {
        // User does not exist, insert the new user
        db.prepare(`
            INSERT INTO Users (Name, Email, User_Role) VALUES (?, ?, ?)
        `).run(displayName, email, role);
    } else {
        // If the existing user is already an admin, update role if necessary
        if (existingUser.User_Role !== role) {
            db.prepare(`
                UPDATE Users SET User_Role = ? WHERE Email = ?
            `).run(role, email);
        }
    }

    res.redirect('/');
});

// Logout route
router.get('/logout', (req, res, next) => {
    console.log('Logging out...');
    console.log('Session:', req.session);

    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.session.destroy((err) => {
            if (err) {
                console.error('Failed to destroy session:', err);
            }
            res.redirect('/');
        });
    });
});

// Middleware to protect routes
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/');
}

module.exports = router;

