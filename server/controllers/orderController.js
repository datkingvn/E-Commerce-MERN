const OrderModel = require('../models/orderModel');
const UserModel = require('../models/userModel');
const CouponModel = require('../models/couponModel');
const asyncHandler = require('express-async-handler');

const createNewOrder = asyncHandler(async (req, res) => {
    const {_id} = req.user;
    const {coupon} = req.body;
    const userCart = await UserModel.findById(_id).select('cart').populate('cart.product', 'title price');
    const products = userCart?.cart?.map(element => ({
        product: element.product._id,
        count: element.quantity,
        color: element.color
    }))
    let total = userCart?.cart?.reduce((sum, el) => el.product.price * el.quantity + sum, 0);
    const createData = {products, total, orderBy: _id};
    if (coupon) {
        const selectedCoupon = await CouponModel.findById(coupon)
        total = Math.round(total * (1 - +selectedCoupon.discount / 100) / 1000) * 1000 || total; // Nếu ông này là NaN => trả về total
        createData.total = total;
        createData.coupon = coupon;
    }

    const result = await OrderModel.create(createData)
    return res.status(200).json({
        success: !!result,
        result: result ? result : 'Something Went Wrong!'
    });
});

const updateStatusOrder = asyncHandler(async (req, res) => {
    const {oid} = req.params;
    const {status} = req.body;
    if (!status) throw new Error('Missing Status');
    const updateStatusResponse = await OrderModel.findByIdAndUpdate(oid, {status}, {new: true})
    return res.status(200).json({
        success: !!updateStatusResponse,
        result: updateStatusResponse ? updateStatusResponse : 'Something Went Wrong!'
    });
});

const getSingleUserOrder = asyncHandler(async (req, res) => {
    const {_id} = req.user;
    const singleUserOrderResponse = await OrderModel.find({orderBy: _id})
    return res.status(200).json({
        success: !!singleUserOrderResponse,
        result: singleUserOrderResponse ? singleUserOrderResponse : 'Something Went Wrong!'
    });
});

const getAllUserOrders = asyncHandler(async (req, res) => {
    const {_id} = req.user;
    const allUserOrdersResponse = await OrderModel.find()
    return res.status(200).json({
        success: !!allUserOrdersResponse,
        result: allUserOrdersResponse ? allUserOrdersResponse : 'Something Went Wrong!'
    });
});

module.exports = {
    createNewOrder,
    updateStatusOrder,
    getSingleUserOrder, getAllUserOrders
}