const ProductCategoryModel = require('../models/productCategoryModel');
const asyncHandler = require('express-async-handler');

// Create Product Category
const createProductCategory = asyncHandler(async (req, res) => {
    const productCategoryResponse = await ProductCategoryModel.create(req.body);
    return res.status(200).json({
        success: !!productCategoryResponse,
        createdCategory: productCategoryResponse ? productCategoryResponse : 'Cannot Create New Product-Category'
    })
});

// Get All Product Categies
const getAllProductCategories = asyncHandler(async (req, res) => {
    const productCategoryResponse = await ProductCategoryModel.find();
    return res.status(200).json({
        success: !!productCategoryResponse,
        productCategories: productCategoryResponse ? productCategoryResponse : 'Cannot Get All Product-Category'
    })
});

// Update Product Category
const updateProductCategory = asyncHandler(async (req, res) => {
    const {pcid} = req.params;
    const productCategoryResponse = await ProductCategoryModel.findByIdAndUpdate(pcid, req.body, {new: true});
    return res.status(200).json({
        success: !!productCategoryResponse,
        updatedProductCategory: productCategoryResponse ? productCategoryResponse : 'Cannot Update Product-Category'
    })
});

// Delete Product Category
const deleteProductCategory = asyncHandler(async (req, res) => {
    const {pcid} = req.params;
    const productCategoryResponse = await ProductCategoryModel.findByIdAndDelete(pcid);
    return res.status(200).json({
        success: !!productCategoryResponse,
        deletedProductCategory: productCategoryResponse ? productCategoryResponse : 'Cannot Delete Product-Category'
    })
});
module.exports = {
    createProductCategory, getAllProductCategories, updateProductCategory, deleteProductCategory
}