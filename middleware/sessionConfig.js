const session = require('express-session');

// Configure and export the session middleware
const sessionMiddleware = session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
});

module.exports = sessionMiddleware;
