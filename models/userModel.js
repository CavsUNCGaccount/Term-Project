function getAllUsers() {
    return [{ id: 1, name: 'John Doe' }];
  }
  
  function createUser(userData) {
    return { id: 2, ...userData };
  }
  
  function updateUser(userId, userData) {
    return { id: userId, ...userData };
  }
  
  function deleteUser(userId) {
    return { message: `User with ID ${userId} deleted` };
  }
  
  module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
  };
  