const BrandModel = require('../models/brandModel');
const asyncHandler = require('express-async-handler');

const createBrand = asyncHandler(async (req, res) => {
    const brandResponse = await BrandModel.create(req.body);
    return res.status(200).json({
        success: !!brandResponse,
        createdBrand: brandResponse ? brandResponse : 'Cannot Create New Brand'
    })
});

const getAllBrands = asyncHandler(async (req, res) => {
    const brandResponse = await BrandModel.find();
    return res.status(200).json({
        success: !!brandResponse,
        brands: brandResponse ? brandResponse : 'Cannot Get All Brand'
    })
});

const updateBrand = asyncHandler(async (req, res) => {
    const {brid} = req.params;
    const brandResponse = await BrandModel.findByIdAndUpdate(brid, req.body, {new: true});
    return res.status(200).json({
        success: !!brandResponse,
        updatedBrand: brandResponse ? brandResponse : 'Cannot Update Brand'
    })
});

const deleteBrand = asyncHandler(async (req, res) => {
    const {brid} = req.params;
    const brandResponse = await BrandModel.findByIdAndDelete(brid);
    return res.status(200).json({
        success: !!brandResponse,
        deletedBrand: brandResponse ? brandResponse : 'Cannot Delete Brand'
    })
});

module.exports = {
    createBrand, getAllBrands, updateBrand, deleteBrand
}