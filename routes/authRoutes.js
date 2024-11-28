const express = require('express');
const passport = require('passport');

const router = express.Router();

// Route to initiate Google authentication
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'], 
    prompt: 'select_account'  // Force the account selection screen each time
}));

// Callback route after Google authentication
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/sign-up'
}), (req, res) => {
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

// Dashboard protected route
router.get('/dashboard', isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}, welcome to the dashboard!`);
});

// Middleware to protect routes
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}

module.exports = router;
