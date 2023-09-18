const BlogModel = require('../models/blogModel');
const asyncHandler = require('express-async-handler');

const createNewPostBlog = asyncHandler(async (req, res) => {
    const {title, description, category} = req.body;
    if (!title || !description || !category) throw new Error('Missing Data!');
    const postBlogResponse = await BlogModel.create(req.body);
    return res.status(200).json({
        success: !!postBlogResponse,
        createdPostBlog: postBlogResponse ? postBlogResponse : 'Cannot Create New Post Blog'
    });
});

const updatePostBlog = asyncHandler(async (req, res) => {
    const {bid} = req.params;
    if (Object.keys(req.body).length === 0) throw new Error('Missing Data!');
    const postBlogResponse = await BlogModel.findByIdAndUpdate(bid, req.body, {new: true});
    return res.status(200).json({
        success: !!postBlogResponse,
        updatedPostBlog: postBlogResponse ? postBlogResponse : 'Cannot Update Post Blog'
    });
});

const getAllPostBlogs = asyncHandler(async (req, res) => {
    const postBlogResponse = await BlogModel.find();
    return res.status(200).json({
        success: !!postBlogResponse,
        dataAllPostBlogs: postBlogResponse ? postBlogResponse : 'Cannot Get Alll Post Blog'
    });
});

// ------ Start Like / Dislike Post Blog ------ //

/* Khi người dùng like 1 bài Blog =>
* 1. Check xem User trước đó có Dislike hay không => Bỏ Dislike
* 2. Check xem User trước đó có Like hay không => Bỏ Like / Nếu chưa Like => Thêm Like */

const likePostBlog = asyncHandler(async (req, res) => {
    const {_id} = req.user;
    const {bid} = req.body;
    if (!bid) throw new Error('Missing Post Blog ID!');
    const postBlog = await BlogModel.findById(bid);

    // B1: Check xem User trước đó có Dislike hay không => Bỏ Dislike
    const alreadyDisliked = postBlog?.dislikes?.find(element => element.toString() === _id);
    if (alreadyDisliked) {
        // $pull: là một phép toán cập nhật để xóa một giá trị khỏi một mảng trong documents
        const removeDislike = await BlogModel.findByIdAndUpdate(bid, {$pull: {dislikes: _id}}, {new: true});
        return res.status(200).json({
            success: !!removeDislike,
            result: removeDislike
        })
    };

    // B2. Check xem User trước đó có Like hay không => Bỏ Like / Nếu chưa Like => Thêm Like */
    const isLiked = postBlog?.likes?.find(element => element.toString() === _id);

    if (isLiked) { // Đã Like => Bỏ Like
        const removeLike = await BlogModel.findByIdAndUpdate(bid, {$pull: {likes: _id}}, {new: true});
        return res.status(200).json({
            success: !!removeLike,
            result: removeLike
        })
    } else { // Nếu chưa Like => Thêm Like
        const addLike = await BlogModel.findByIdAndUpdate(bid, {$push: {likes: _id}}, {new: true});
        return res.status(200).json({
            success: !!addLike,
            result: addLike
        })
    };

});

// ------ End Like / Dislike Post Blog ------ //
module.exports = {
    createNewPostBlog, updatePostBlog,
    getAllPostBlogs,
    likePostBlog
}