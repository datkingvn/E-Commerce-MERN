const OrderModel = require('../models/orderModel');
const UserModel = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const createNewOrder = asyncHandler(async (req, res) => {
    const {_id} = req.user;
    const userCart = await UserModel.findById(_id).select('cart');
    return res.status(200).json({
        success: !!userCart,
        createdPostBlog: userCart ? userCart : 'Cannot Create New Order'
    });
});

module.exports = {
    createNewOrder
}