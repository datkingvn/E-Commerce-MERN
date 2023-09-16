const router = require('express').Router()
const userController = require('../controllers/userController.js')
const {isValidAccessToken, isAdmin} = require('../middlewares/isValidToken')

// Register
router.post('/register', userController.userRegister)
// Login
router.post('/login', userController.userLogin)
// Create new accessToken when accessToken old expired
router.post('/refreshtoken', userController.refreshAccessToken)
// Logout
router.get('/logout', userController.userLogout)
// Forgot Password
router.get('/forgot-password', userController.forgotPassword)
// Reset Password
router.put('/reset-password', userController.resetPassword)

// Update a user
router.put('/current',[isValidAccessToken], userController.updateUser)
// Get Single User
router.get('/current',[isValidAccessToken], userController.getSingleUser)
// Get All Users
router.get('/', [isValidAccessToken, isAdmin], userController.getAllUsers)
// Delete User
router.delete('/', [isValidAccessToken, isAdmin], userController.deleteUser)
// Update User by Admin
router.put('/:uid', [isValidAccessToken, isAdmin], userController.updateUserByAdmin) // uid là định nghĩa params ở trong updateUserByAdmin

module.exports = router