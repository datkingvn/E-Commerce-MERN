const router = require('express').Router();
const productController = require('../controllers/productController.js');
const {isValidAccessToken, isAdmin} = require('../middlewares/isValidToken');
const uploadImage = require('../config/cloudinary.config');

router.post('/', [isValidAccessToken, isAdmin], productController.createProduct);
router.get('/', productController.getAllProduct);
router.put('/ratings', [isValidAccessToken], productController.ratings);

router.put('/upload-images/:pid', [isValidAccessToken, isAdmin], uploadImage.array('images', 10) ,productController.uploadImagesProduct);
router.put('/:pid', [isValidAccessToken, isAdmin], productController.updateProduct);
router.delete('/:pid', [isValidAccessToken, isAdmin], productController.deleteProduct);
router.get('/:pid', productController.getSingleProduct);

module.exports = router
