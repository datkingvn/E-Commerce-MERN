const router = require('express').Router();
const productCategoryController = require('../controllers/productCategoryController.js');
const {isValidAccessToken, isAdmin} = require('../middlewares/isValidToken');

router.get('/', productCategoryController.getAllProductCategories);
router.post('/', [isValidAccessToken, isAdmin], productCategoryController.createProductCategory);
router.put('/:pcid', [isValidAccessToken, isAdmin], productCategoryController.updateProductCategory);
router.delete('/:pcid', [isValidAccessToken, isAdmin], productCategoryController.deleteProductCategory);

module.exports = router
