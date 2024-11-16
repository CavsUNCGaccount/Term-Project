const userModel = require('../models/userModel');

// GET all users
function getAllUsers(req, res) {
  const users = userModel.getAllUsers();
  res.json(users);
}

// POST to create a new user
function createUser(req, res) {
  const newUser = userModel.createUser(req.body);
  res.json(newUser);
}

// PUT to update a user
function updateUser(req, res) {
  const updatedUser = userModel.updateUser(req.params.id, req.body);
  res.json(updatedUser);
}

// DELETE a user
function deleteUser(req, res) {
  const message = userModel.deleteUser(req.params.id);
  res.json(message);
}

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
