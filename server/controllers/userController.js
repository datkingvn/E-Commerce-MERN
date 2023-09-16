const userModel = require('../models/userModel.js');
const asyncHandler = require('express-async-handler');
const {response} = require("express");
const {generateAccessToken, generateRefreshToken} = require('../middlewares/jwt');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/sendMail')
const crypto = require("crypto");

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
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            msg: "Missing Input!"
        });
    }

    const authUser = await userModel.findOne({email});
    if (authUser && await authUser.isCorrectPassword(password)) {
        const {password, role, refreshToken, ...userData} = authUser.toObject();
        // Create accessToken
        const accessToken = generateAccessToken(authUser._id, role);
        // Create refreshToken
        const newRefreshToken = generateRefreshToken(authUser._id);
        // Save refreshToken to Database
        await userModel.findByIdAndUpdate({_id: authUser._id}, {refreshToken: newRefreshToken}, {new: true});
        // Save refreshToken to Cookies (use Cookie-Parser)
        res.cookie('refreshToken', newRefreshToken, {httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000});
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

const refreshAccessToken = asyncHandler(async (req, res) => {
    // Get token from cookies
    const cookie = req.cookies
    // Check xem có token hay không
    if (!cookie && !cookie.refreshToken) throw new Error('No refreshToken in cookies')
    // Check token có hợp lệ hay không
    const decodedRefreshToken = jwt.verify(cookie.refreshToken, process.env.JWT_SECRET)
    const isRefreshTokenMatched = await userModel.findOne({
        _id: decodedRefreshToken._id,
        refreshToken: cookie.refreshToken
    })
    return res.status(200).json({
        success: !!isRefreshTokenMatched,
        newAccessToken: isRefreshTokenMatched ? generateAccessToken(isRefreshTokenMatched._id, isRefreshTokenMatched.role) : 'refreshToken Not Match!'
    })

})

// Logout
const userLogout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;

    if (!cookie || !cookie.refreshToken) throw new Error('No Refresh Token In Cookies');
    // Xoá refreshToken ở Database
    await userModel.findOneAndUpdate({refreshToken: cookie.refreshToken}, {refreshToken: ''}, {new: true});
    // Xoá refreshToken ở trình duyệt
    res.clearCookie('refreshToken', {
        httpOnly: true, secure: true
    });

    return res.status(200).json({
        success: true,
        msg: 'Logout Successfully!'
    })
});

//--------- Quy trình đặt lại mật khẩu như sau: -----------//
// Client gửi email đến server để yêu cầu đặt lại mật khẩu.
// Server kiểm tra xem email có hợp lệ không.
// Server gửi email đến client, đi kèm với một liên kết (link) chứa mã thông báo để thay đổi mật khẩu.
// Client kiểm tra email và nhấp vào liên kết.
// Client gửi yêu cầu API đến server kèm theo mã thông báo.
// Server kiểm tra xem mã Token có khớp với mã Token mà server đã gửi qua email hay không.
// Nếu mã Token khớp, server cho phép thay đổi mật khẩu.
//--------------------------------------------------------//

const forgotPassword = asyncHandler(async (req, res) => {
    const {email} = req.query;
    if (!email) throw new Error('Missing Email!');
    const user = await userModel.findOne({email});
    if (!user) throw new Error('User Not Found');

    const resetToken = user.createPasswordChangedToken();
    await user.save()

    const contentForgotPassword = `Please <a href=${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>Click Here</a> to reset your password. This link will be expire after 15 minutes`

    const data = {
        email,
        contentForgotPassword
    }

    const emailSendingResult = await sendMail(data)
    return res.status(200).json({
        success: !!emailSendingResult,
        emailSendingResult
    })
})

// Reset Password
const resetPassword = asyncHandler(async (req, res) => {
    const {password, token} = req.body;
    if (!password || !token) throw new Error('Missing Input!');
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex'); // Hash ra cho bằng resetToken bên userModel
    const validUser = await userModel.findOne({passwordResetToken, passwordResetExpired: {$gt: Date.now()}});
    if (!validUser) throw new Error('Invalid Reset Token');
    validUser.password = password;
    validUser.passwordResetToken = undefined;
    validUser.passwordChangeAt = Date.now();
    validUser.passwordResetExpired = undefined;
    await validUser.save();
    return res.status(200).json({
        success: !!validUser,
        msg: validUser ? 'Updated Password' : 'Something Went Wrong'
    })
})

// Get all Users
const getAllUsers = asyncHandler(async (req, res) => {
    const getDataUsers = await userModel.find().select('-refreshToken -password -role')
    return res.status(200).json({
        success: !!getDataUsers,
        user: getDataUsers
    })
})

// Delete User
const deleteUser = asyncHandler(async (req, res) => {
    const {_id} = req.query
    if (!_id) throw new Error('Missing Input ID User')
    const response = await userModel.findByIdAndDelete(_id)
    return res.status(200).json({
        success: !!response,
        deletedUser: response ? `Deleted User ${response.email} Success` : 'No User Delete!'
    })
})

// Update User
const updateUser = asyncHandler(async (req, res) => {
    const {_id} = req.user;

    if (!_id || Object.keys(req.body).length === 0) throw new Error('Cannot Update User - Input Invalid!');
    // Loại bỏ trường "role" khỏi req.body tránh user update lên 'role' admin
    const {role, ...updateData} = req.body;

    const updatedUserResponse = await userModel.findByIdAndUpdate(_id, updateData, {new: true}).select('-password -role');

    return res.status(200).json({
        success: !!updatedUserResponse,
        updatedUser: updatedUserResponse ? updatedUserResponse : 'Something Went Wrong!'
    });
})

// Update User By Admin
const updateUserByAdmin = asyncHandler(async (req, res) => {
    const {uid} = req.params;

    if (Object.keys(req.body).length === 0) throw new Error('Cannot Update User - Input Invalid!');

    const updatedUserResponse = await userModel.findByIdAndUpdate(uid, req.body, {new: true}).select('-password -role -refreshToken');

    return res.status(200).json({
        success: !!updatedUserResponse,
        updatedUser: updatedUserResponse ? updatedUserResponse : 'Something Went Wrong!'
    });

});
module.exports = {
    userRegister, userLogin, userLogout,
    getSingleUser, getAllUsers,
    refreshAccessToken,
    forgotPassword, resetPassword,
    deleteUser, updateUser, updateUserByAdmin
}