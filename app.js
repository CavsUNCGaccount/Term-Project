const express = require('express');
const app = express();
const port = 3000;

const path = require('path');

// Import models
const cartModel = require('./models/cartModel');
const cartProductModel = require('./models/cartProductModel'); // Assuming you have this model

// Custom middleware to parse JSON for non-GET requests
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
const cartProductRoutes = require('./routes/cartProductRoutes');

// Use the routes
console.log("Registering product routes");
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/cart-products', cartProductRoutes);

// Engine to display views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Pages
app.get('/test', (req, res) => {
  res.send('Test route working!');
});

app.get('/', (req, res) => {
  res.render('index', { user: null, isAdmin: false });
});

app.get('/products', (req, res) => {
  res.render('products', { user: null, isAdmin: false });
});

app.get('/cart', async (req, res) => {
  try {
    // We will use a hardcoded cart for the simplified version
    const cart = await cartModel.getCartByUserId(1); // Assuming a single user/cart
    let cartProducts = [];
    let cartSummary = {
      totalItems: 0,
      subtotal: 0,
      tax: 0,
      deliveryFee: 0,
      total: 0
    };

    if (cart) {
      cartProducts = await cartProductModel.getCartProductsByCartId(cart.Id);

      // Calculate the summary for the cart
      cartSummary.totalItems = cartProducts.reduce((total, product) => total + product.Quantity, 0);
      cartSummary.subtotal = cartProducts.reduce((total, product) => total + product.Price * product.Quantity, 0);
      cartSummary.tax = cartSummary.subtotal * 0.0675; // Tax rate of 6.75%
      cartSummary.deliveryFee = cartSummary.subtotal * 0.03; // Delivery fee of 3%
      cartSummary.total = cartSummary.subtotal + cartSummary.tax + cartSummary.deliveryFee;
    }

    res.render('cart', { user: null, isAdmin: false, cartProducts, cartSummary });
  } catch (err) {
    console.error('Error fetching cart data:', err);
    res.status(500).send('Internal Server Error');
  }
});

/**
 * Start the server
 * Server will run on http://localhost:3000
 * Use command 'npx nodemon app.js' or 'node app.js' to start the server
 */
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
