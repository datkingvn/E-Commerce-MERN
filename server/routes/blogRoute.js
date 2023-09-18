const router = require('express').Router();
const blogController = require('../controllers/blogController.js');
const {isValidAccessToken, isAdmin} = require('../middlewares/isValidToken');

router.get('/', blogController.getAllPostBlogs);
router.post('/like', [isValidAccessToken], blogController.likePostBlog);
router.post('/', [isValidAccessToken, isAdmin], blogController.createNewPostBlog);
router.put('/:bid', [isValidAccessToken, isAdmin], blogController.updatePostBlog);

module.exports = router