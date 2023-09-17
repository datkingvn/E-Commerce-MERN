const router = require('express').Router();
const productController = require('../controllers/productController.js');
const {isValidAccessToken, isAdmin} = require('../middlewares/isValidToken');

router.post('/', [isValidAccessToken, isAdmin], productController.createProduct);
router.get('/', productController.getAllProduct);
router.put('/ratings', [isValidAccessToken], productController.ratings);

router.put('/:pid', [isValidAccessToken, isAdmin], productController.updateProduct);
router.delete('/:pid', [isValidAccessToken, isAdmin], productController.deleteProduct);
router.get('/:pid', productController.getSingleProduct);

module.exports = router
