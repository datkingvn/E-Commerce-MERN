const productModel = require('../models/productModel');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

// Create Product
const createProduct = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error('Missing Input!');
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title); // Chuyển title sang slug
    const newProduct = await productModel.create(req.body);
    return res.status(200).json({
        success: !!newProduct,
        createdProduct: newProduct ? newProduct : 'Cannot Create New Product!'
    })
})

// Get Single Product
const getSingleProduct = asyncHandler(async (req, res) => {
    const {pid} = req.params;
    const product = await productModel.findById(pid)
    return res.status(200).json({
        success: !!product,
        productData: product ? product : 'Cannot Find Product!'
    })
})

// Get All Product
const getAllProduct = asyncHandler(async (req, res) => {
    const products = await productModel.find();
    return res.status(200).json({
        success: !!products,
        productData: products ? products : 'Cannot Get All Products!'
    })
})

// Update Product
const updateProduct = asyncHandler(async (req, res) => {
    const {pid} = req.params;
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const updatedProductResponse = await productModel.findByIdAndUpdate(pid, req.body, {new: true});
    return res.status(200).json({
        success: !!updatedProductResponse,
        updatedProduct: updatedProductResponse ? updatedProductResponse : 'Cannot Update Product!'
    })
})

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
    const {pid} = req.params;
    const deleledProductResponse = await productModel.findByIdAndDelete(pid);
    return res.status(200).json({
        success: !!deleledProductResponse,
        updatedProduct: deleledProductResponse ? deleledProductResponse : 'Cannot Delete Product!'
    })
})

module.exports = {
    createProduct, getSingleProduct, getAllProduct,
    updateProduct, deleteProduct
}