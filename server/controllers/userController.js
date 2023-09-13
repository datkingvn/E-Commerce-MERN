const userModel = require('../models/userModel.js');
const asyncHandler = require('express-async-handler');

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

module.exports = {
    userRegister
}