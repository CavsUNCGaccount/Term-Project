const express = require('express');
const app = express();
const port = 3000;

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

// Use the routes
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/users', userRoutes);

/**
 * Start the server
 * Server will run on http://localhost:3000
 * Use command 'npx nodemon app.js' to start the server
*/
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
