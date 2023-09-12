const router = require('express').Router()
const userController = require('../controllers/userController.js')


// Create
router.post('/register', userController.userRegister)
// Update
// Delete
// Get a User
// Get all User

module.exports = router