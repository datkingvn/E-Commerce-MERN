const router = require('express').Router();
const blogController = require('../controllers/blogController.js');
const {isValidAccessToken, isAdmin} = require('../middlewares/isValidToken');
const uploadImage = require('../config/cloudinary.config');

router.get('/', blogController.getAllPostBlogs);
router.get('/:bid', blogController.getSinglePostBlog);
router.post('/', [isValidAccessToken, isAdmin], blogController.createNewPostBlog);
router.put('/like/:bid', [isValidAccessToken], blogController.likePostBlog);
router.put('/upload-image/:bid', [isValidAccessToken], uploadImage.single('image'), blogController.uploadImageBlog);
router.put('/dislike/:bid', [isValidAccessToken], blogController.dislikePostBlog);
router.put('/:bid', [isValidAccessToken, isAdmin], blogController.updatePostBlog);
router.delete('/:bid', [isValidAccessToken, isAdmin], blogController.deletePostBlog);

module.exports = router