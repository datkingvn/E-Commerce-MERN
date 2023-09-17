const BlogCategoryModel = require('../models/blogCategoryModel');
const asyncHandler = require('express-async-handler');

// Create Blog Category
const createBlogCategory = asyncHandler(async (req, res) => {
    const blogCategoryResponse = await BlogCategoryModel.create(req.body);
    return res.status(200).json({
        success: !!blogCategoryResponse,
        createdCategory: blogCategoryResponse ? blogCategoryResponse : 'Cannot Create New Blog-Category'
    })
});

// Get All Blog Categies
const getAllBlogCategories = asyncHandler(async (req, res) => {
    const blogCategoryResponse = await BlogCategoryModel.find().select('title _id');
    return res.status(200).json({
        success: !!blogCategoryResponse,
        blogCategories: blogCategoryResponse ? blogCategoryResponse : 'Cannot Get All Blog-Category'
    })
});

// Update Blog Category
const updateBlogCategory = asyncHandler(async (req, res) => {
    const {bcid} = req.params;
    const blogCategoryResponse = await BlogCategoryModel.findByIdAndUpdate(bcid, req.body, {new: true});
    return res.status(200).json({
        success: !!blogCategoryResponse,
        updatedBlogCategory: blogCategoryResponse ? blogCategoryResponse : 'Cannot Update Blog-Category'
    })
});

// Delete Blog Category
const deleteBlogCategory = asyncHandler(async (req, res) => {
    const {bcid} = req.params;
    const blogCategoryResponse = await BlogCategoryModel.findByIdAndDelete(bcid);
    return res.status(200).json({
        success: !!blogCategoryResponse,
        deletedBlogCategory: blogCategoryResponse ? blogCategoryResponse : 'Cannot Delete Blog-Category'
    })
});
module.exports = {
    createBlogCategory, getAllBlogCategories, updateBlogCategory, deleteBlogCategory
}