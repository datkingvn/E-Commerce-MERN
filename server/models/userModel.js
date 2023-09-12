const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user',
    },
    cart: {
        type: Array,
        default: [],
    },
    address: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Address'
        }
    ],
    wishList: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Product'
        }
    ],
    isBlocked: {
        type: Boolean,
        default: false,
    },
    refreshToken: {
        type: String,
    },
    passwordChangeAt: {
        type: String,
    },
    passwordResetToken: {
        type: String,
    },
    passwordResetExpired: {
        type: String,
    }
}, {timestamps: true});

//Export the model
module.exports = mongoose.model('User', userSchema);