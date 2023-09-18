const router = require('express').Router();
const BrandController = require('../controllers/brandController.js');
const {isValidAccessToken, isAdmin} = require('../middlewares/isValidToken');

router.get('/', BrandController.getAllBrands);
router.post('/', [isValidAccessToken, isAdmin], BrandController.createBrand);
router.put('/:brid', [isValidAccessToken, isAdmin], BrandController.updateBrand);
router.delete('/:brid', [isValidAccessToken, isAdmin], BrandController.deleteBrand);

module.exports = router
