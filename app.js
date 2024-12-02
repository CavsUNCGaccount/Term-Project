const express = require('express');
const app = express();
const port = 3000;

const path = require('path');

// Import models
const cartModel = require('./models/cartModel');
const productModel = require('./models/productModel');
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
  res.render('index');
});

app.get('/products', async (req, res) => {
  try {
    
    const products = await productModel.getAllProducts();
    res.render('products', { products });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).send('Internal server error');
  }
});

app.get('/cart', async (req, res) => {
  try {
    const cart = await cartModel.getActiveCart();

    if (!cart) {
      return res.render('cart', { cartProducts: [], cartSummary: getEmptyCartSummary() });
    }

    const cartProducts = await cartProductModel.getCartProductsByCartId(cart.Id);

    // Log data for debugging purposes
    console.log('Cart Products:', cartProducts);

    const cartSummary = calculateCartSummary(cartProducts);
    
    console.log('Cart Summary:', cartSummary);

    res.render('cart', { cartProducts, cartSummary });
  } catch (err) {
    console.error('Error fetching cart data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Utility function to return an empty cart summary
function getEmptyCartSummary() {
  return {
    totalItems: 0,
    subtotal: 0,
    tax: 0,
    deliveryFee: 0,
    total: 0
  };
}

// Function to calculate cart summary based on products
function calculateCartSummary(cartProducts) {
  let totalItems = 0;
  let subtotal = 0;

  cartProducts.forEach(product => {
    console.log(`Product ID: ${product.Product_Id}, Price: ${product.Price}, Quantity: ${product.Quantity}`);
    if (product.Price && product.Quantity) {
      totalItems += product.Quantity;
      subtotal += product.Price * product.Quantity;
    } else {
      console.error(`Missing price or quantity for product ID: ${product.Product_Id}`);
    }
  });

  const tax = subtotal * 0.0675; // Example: 6.75%
  const deliveryFee = subtotal * 0.03; // Example: 3% delivery fee
  const total = subtotal + tax + deliveryFee;

  return {
    totalItems,
    subtotal,
    tax,
    deliveryFee,
    total
  };
}

app.get('/checkout', (req, res) => {
  console.log("Checkout route reached");

  // Placeholder cart summary
  const cartSummary = {
      totalItems: 0,
      subtotal: 0,
      tax: 0,
      deliveryFee: 0,
      total: 0,
  };

  console.log("Cart summary generated:", cartSummary);

  // Render the checkout page with placeholder data
  res.render('checkout', { cartSummary }, (err, html) => {
      if (err) {
          console.error("Error rendering checkout page:", err);
          return res.status(500).send("Error rendering checkout page");
      } else {
          res.send(html);
      }
  });
});

/**
 * Start the server
 * Server will run on http://localhost:3000
 * Use command 'npx nodemon app.js' or 'node app.js' to start the server
 */
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
