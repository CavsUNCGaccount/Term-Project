exports.getAllCarts = (req, res) => {
    res.json({ message: 'This will return all carts' });
};

exports.createCart = (req, res) => {
    res.json({ message: 'This will create a new cart' });
};

exports.updateCart = (req, res) => {
    res.json({ message: `This will update cart with ID: ${req.params.id}` });
};

exports.deleteCart = (req, res) => {
    res.json({ message: `This will delete cart with ID: ${req.params.id}` });
};
