const router = require('express').Router();
const blogCategoryController = require('../controllers/blogCategoryController.js');
const {isValidAccessToken, isAdmin} = require('../middlewares/isValidToken');

router.get('/', blogCategoryController.getAllBlogCategories);
router.post('/', [isValidAccessToken, isAdmin], blogCategoryController.createBlogCategory);
router.put('/:bcid', [isValidAccessToken, isAdmin], blogCategoryController.updateBlogCategory);
router.delete('/:bcid', [isValidAccessToken, isAdmin], blogCategoryController.deleteBlogCategory);

module.exports = router
