const CouponModel = require('../models/couponModel');
const asyncHandler = require('express-async-handler');
const BrandModel = require("../models/brandModel");
const e = require("express");

const createCoupon = asyncHandler(async (req, res) => {
    const {name, discount, expired} = req.body;
    if (!name || !discount || !expired) throw new Error('Missing Input To Create Coupon');
    const couponResponse = await CouponModel.create({
        ...req.body,
        expired: Date.now() + expired * 24 * 60 * 60 * 1000 // Lưu ngày hết hạn
    });
    return res.status(200).json({
        success: !!couponResponse,
        createdCoupon: couponResponse ? couponResponse : 'Cannot Create New Coupon'
    });
});

const getAllCoupons = asyncHandler(async (req, res) => {
    const couponResponse = await CouponModel.find().select('-createdAt -updatedAt');
    return res.status(200).json({
        success: !!couponResponse,
        coupons: couponResponse ? couponResponse : 'Cannot Get All Coupon'
    });
});

const updateCoupon = asyncHandler(async (req, res) => {
    const {cid} = req.params;
    if (Object.keys(req.body).length === 0) throw new Error('Missing Input To Create Coupon');
    const couponResponse = await CouponModel.findByIdAndUpdate(cid, req.body, {new: true});
    return res.status(200).json({
        success: !!couponResponse,
        updatedCoupon: couponResponse ? couponResponse : 'Cannot Update Coupon'
    });
});

const deleteCoupon = asyncHandler(async (req, res) => {
    const {cid} = req.params
    const couponResponse = await CouponModel.findByIdAndDelete(cid);
    return res.status(200).json({
        success: !!couponResponse,
        deletedCoupon: couponResponse ? couponResponse : 'Cannot Delete Coupon'
    });
});

module.exports = {
    createCoupon, getAllCoupons, updateCoupon, deleteCoupon
}