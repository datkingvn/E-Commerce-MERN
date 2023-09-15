const router = require('express').Router()
const userController = require('../controllers/userController.js')
const {isValidAccessToken} = require('../middlewares/isValidToken')

// Register
router.post('/register', userController.userRegister)
// Login
router.post('/login', userController.userLogin)
// Get Single User
router.get('/current',[isValidAccessToken], userController.getSingleUser)

module.exports = router