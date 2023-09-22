const router = require('express').Router();
const OrderController = require('../controllers/orderController.js');
const {isValidAccessToken, isAdmin} = require('../middlewares/isValidToken');

router.post('/', [isValidAccessToken], OrderController.createNewOrder);
router.get('/', [isValidAccessToken], OrderController.getSingleUserOrder);
router.put('/status/:oid', [isValidAccessToken, isAdmin], OrderController.updateStatusOrder);
router.get('/admin', [isValidAccessToken, isAdmin], OrderController.getSingleUserOrder);

module.exports = router
