const router = require('express').Router()
const userController = require('../controllers/userController.js')

// Register
router.post('/register', userController.userRegister)
// Login
router.post('/login', userController.userLogin)

module.exports = router