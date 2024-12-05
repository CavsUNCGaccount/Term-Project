# Term-Project
Repository for CSC-372 Term Project. <br>
My project is the fictional online store named PlayStation Nation. <br>
Below is an overview of it and instructions on how to run it. <br>

# PlayStation Nation - Video Game Store

### Project Overview
PlayStation Nation is a retro video game e-commerce store that sells PlayStation consoles, games, accessories, and decor. This project simulates a basic e-commerce experience, allowing users to browse products, add them to a shopping cart, and proceed to a placeholder checkout page.
### Features
- **Products Page**: Users can view all products available for sale, organized into different categories (Consoles, Games, Accessories, Decor).
- **Shopping Cart**: Users can add products to their cart and view their current items in the shopping cart page.
- **Checkout Page**: Users can proceed to a checkout page, which is currently a static placeholder without back-end functionality.
- **Admin Capabilities**: Limited admin capabilities for managing products through dedicated endpoints (create, update, delete products). Bulk uploading works, but does not take into account trying to upload duplicate items.

#### Requirements
- Node.js (v14 or above)
- npm (Node Package Manager)
- SQLite database browser (e.g., DB Browser for SQLite)
- axios
- better-sqlite3
- ejs 
- express
- multer
- check the packages.json file to see all the requirements.

#### Installation Steps
1. Clone this repository or download a zip file of the project.
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd playstation-nation
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up the SQLite database:
   - Ensure the database is set up correctly by running the provided SQL script in your SQLite browser.
   - The database tables include `Products`, `Categories`, `Carts`, and `CartProducts`. Make sure they are created properly before running the server. The code already has the database with the tables. If you need to create a new one, run the SQL file create_tables.sql. The run the other sql files to add catergories and add 4 products, 1 of each category.

5. Run the server locally:
   'node app.js' using the git bash terminal.
   ```

6. Open the application in your browser at `http://localhost:3000`.

### Project Structure
- **`/public`**: Contains static files (CSS, JavaScript).
- **`/views`**: Contains EJS templates for rendering pages like products, cart, and checkout.
- **`/routes`**: Defines the various endpoints for products, carts, and cart products.
- **`/models`**: Contains database access logic for products, carts, and cart products.
- **`app.js`**: The main server file, where all routes are configured.

### How to Use
1. **Browsing Products**: Navigate to the `/products` page to see a list of all products. Users can add items to their shopping cart by clicking "Add to Cart."
2. **Viewing the Cart**: Navigate to the `/cart` page to view the items in the shopping cart, see the subtotal, tax, delivery fee, and total amount. Users can also remove items from the cart.
3. **Checkout**: Click on the "Proceed to Checkout" button on the cart page to go to the checkout page. The checkout page currently displays placeholder data.

### Admin Capabilities (Endpoints)
- **Add Product**: `POST /api/products` – Add a new product to the store. 
- **Update Product**: `PUT /api/products/:id` – Update product details.
- **Delete Product**: `DELETE /api/products/:id` – Remove a product from the store.
- Note: Deleting a product with the current implementation does not work if that product is in the cart. Make sure remove it from the cart first. 

### Known Issues and Future Improvements
- **Consolidation of Duplicate Cart Items**: Currently, adding the same product to the cart creates a new entry each time. Future improvements will focus on consolidating duplicate items and allowing quantity updates from the cart page.
- **Checkout Functionality**: The checkout page is currently a placeholder and lacks back-end functionality. Implementing a functional checkout with order creation and payment processing is a future goal.
- **User Authentication**: This version does not include user authentication or role-based access control. The previous version with Google OAuth was eliminated due to Google OAuth breaking other features. The sign in and sign out functionalites were working with Google OAuth until I tried to implement other features.

### Setting Up the Database
The project uses an SQLite database to store products, categories, carts, and cart products. The database schema includes:
- **`Products`**: Stores product details such as name, description, price, and category.
- **`Categories`**: Holds product categories (Consoles, Games, Accessories, Decor).
- **`Carts`**: Tracks carts created by the user. The project is simplified to support only a single active cart.
- **`CartProducts`**: Manages the items added to the cart.




