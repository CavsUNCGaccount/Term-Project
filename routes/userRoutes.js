const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET all users
// http://localhost:3000/api/users
router.get('/', userController.getAllUsers);

// POST to create a user
// http://localhost:3000/api/users
router.post('/', userController.createUser);

// PUT to update a user
// http://localhost:3000/api/users/2 (2 is the number of the user)
router.put('/:id', userController.updateUser);

// DELETE a user
// http://localhost:3000/api/users/2 (2 is the number of the user)
router.delete('/:id', userController.deleteUser);

module.exports = router;
