const router = require('express').Router()
const userController = require('../controllers/userController.js')
const {isValidAccessToken} = require('../middlewares/isValidToken')

// Register
router.post('/register', userController.userRegister)
// Login
router.post('/login', userController.userLogin)
// Get Single User
router.get('/current',[isValidAccessToken], userController.getSingleUser)

router.post('/refreshtoken', userController.refreshAccessToken)
// Logout
router.get('/logout', userController.userLogout)
// Forgot Password
router.get('/forgot-password', userController.forgotPassword)
// Reset Password
router.put('/reset-password', userController.resetPassword)

module.exports = router