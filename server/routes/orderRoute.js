const router = require('express').Router();
const OrderController = require('../controllers/orderController.js');
const {isValidAccessToken, isAdmin} = require('../middlewares/isValidToken');

router.post('/', [isValidAccessToken], OrderController.createNewOrder)

module.exports = router
