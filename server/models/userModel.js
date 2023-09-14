const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

// Hash Password (Before save)
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    } // Nếu trường 'password' không thay đổi => false, chuyển sang middleware tiếp theo
    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
})

// Check Password (function (password) => password đó là người dùng nhập vào)
userSchema.methods = {
    isCorrectPassword: async function (password) {
        return await bcrypt.compare(password, this.password)
    }
}

// Cú pháp function() { } trong MongoDB đảm bảo rằng từ khóa this trong phương thức được ràng buộc đúng ngữ cảnh đối tượng hiện tại,
// Trong khi cú pháp Arrow Function () => { } không ràng buộc được ngữ cảnh this và có thể gây ra lỗi hoặc không trả về kết quả như mong đợi.

//Export the model
module.exports = mongoose.model('User', userSchema);