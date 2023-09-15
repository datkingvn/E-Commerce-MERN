const userModel = require('../models/userModel.js');
const asyncHandler = require('express-async-handler');
const {response} = require("express");
const {generateAccessToken, generateRefreshToken} = require('../middlewares/jwt')

// Register
const userRegister = asyncHandler(async (req, res) => {
    const {email, password, firstName, lastName} = req.body;

    if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({
            success: false,
            msg: "Missing Input!"
        });
    }

    const user = await userModel.findOne({email})
    if (user) throw new Error('User Has Existed!')
    else {
        const newUser = await userModel.create(req.body);
        return res.status(200).json({
            success: !!newUser,
            msg: newUser ? 'Register Successfully!' : 'Something Went Wrong!'
        })
    }

});

// Login
const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            msg: "Missing Input!"
        });
    }

    const authUser = await userModel.findOne({ email });
    if (authUser && await authUser.isCorrectPassword(password)) {
        const { password, role, ...userData } = authUser.toObject();
        // Create accessToken
        const accessToken = generateAccessToken(authUser._id, role);
        // Create refreshToken
        const newRefreshToken = generateRefreshToken(authUser._id);
        // Save refreshToken to Database
        await userModel.findByIdAndUpdate({ _id: authUser._id }, { refreshToken: newRefreshToken }, { new: true });
        // Save refreshToken to Cookies (use Cookie-Parser)
        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
        return res.status(200).json({
            success: true,
            accessToken,
            userData
        });
    } else {
        throw new Error('Invalid Credentials!');
    }
});

// getCurrent
const getSingleUser = asyncHandler(async (req, res) => {
    const {_id} = req.user // Lấy bên /middleware/isValidToken.js sau khi đã decode

    const fetchUser = await userModel.findById(_id).select('-refreshToken -password -role');
    return res.status(200).json({
        success: !!fetchUser,
        result: fetchUser ? fetchUser : 'User Not Found'
    })
});


module.exports = {
    userRegister, userLogin,
    getSingleUser
}