require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const path = require('path');
const sessionMiddleware = require('./middleware/sessionConfig');
const passportConfig = require('./config/passport');

// Define admin emails
const adminEmails = [process.env.ADMIN_EMAIL];

app.use(session({
  secret: 'your-secret-key',  // Replace 'your-secret-key' with a real secret key
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(sessionMiddleware);

// Middleware to check admin status
function checkAdminStatus(req, res, next) {
  req.isAdmin = req.isAuthenticated() && adminEmails.includes(req.user?.emails[0].value);
  next();
}

// Middleware to verify if a user is an admin
function isAdminMiddleware(req, res, next) {
  if (req.isAuthenticated() && adminEmails.includes(req.user?.emails[0].value)) {
    console.log("User has admin access");
    return next();
  } else {
    console.log("User does not have admin access");
    res.redirect('/');
  }
}

// Apply the middleware to check admin status for all requests
app.use(checkAdminStatus);

// Custom middleware to parse JSON only for non-GET requests
function jsonParserMiddleware(req, res, next) {
  if (req.method === 'GET') {
    next(); // Skip parsing for GET requests
  } else {
    express.json()(req, res, next); // Apply JSON parsing for other methods
  }
}

// Apply the middleware
app.use(jsonParserMiddleware);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Import routes
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const userRoutes = require('./routes/userRoutes'); 
const authRoutes = require('./routes/authRoutes');
const sessionConfig = require('./middleware/sessionConfig');

// Use the routes
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/users', userRoutes);
app.use('/auth', authRoutes);

app.use(sessionConfig);

passportConfig(passport);

// Engine to display views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Pages
app.get('/', (req, res) => {
  res.render('index', { user: req.user, isAdmin: req.isAdmin });
});

app.get('/products', (req, res) => {
  res.render('products', { user: req.user, isAdmin: req.isAdmin });
});

app.get('/cart', (req, res) => {
  res.render('cart', { user: req.user, isAdmin: req.isAdmin });
});

app.get('/sign-up', (req, res) => {
  res.render('sign-up', { user: req.user });
});

// Admin pages
app.get('/admin/products', isAdminMiddleware, (req, res) => {
  res.render('admin/admin-products', { user: req.user, isAdmin: req.isAdmin });
});

app.get('/admin/upload', isAdminMiddleware, (req, res) => {
  res.render('admin/admin-upload', { user: req.user, isAdmin: req.isAdmin });
});

app.get('/admin/edit', isAdminMiddleware, (req, res) => {
  res.render('admin/products-edit', { user: req.user, isAdmin: req.isAdmin });
});

/**
 * Start the server
 * Server will run on http://localhost:3000
 * Use command 'npx nodemon app.js' or 'node app.js' to start the server
*/
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
