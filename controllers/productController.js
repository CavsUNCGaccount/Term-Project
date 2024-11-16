exports.getAllProducts = (req, res) => {
    res.json([
      { id: 1, name: 'Mock Product 1', price: 10 },
      { id: 2, name: 'Mock Product 2', price: 20 }
    ]);
  };
  
  exports.createProduct = (req, res) => {
    res.json({ message: 'Product created successfully' });
  };
  