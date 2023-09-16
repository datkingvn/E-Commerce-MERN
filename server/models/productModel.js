const mongoose = require('mongoose')

// Product collection schema
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true // Sử dụng để xóa khoảng trắng (space) từ đầu và cuối chuỗi khi lưu trữ dữ liệu
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category'
    },
    quantity: {
        type: Number,
        default: 0
    },
    sold: {
        type: Number,
        default: 0
    },
    images: {
        type: Array
    },
    color: {
        type: String,
        enum: ['Black', 'Grown', 'Red'] // Chỉ nằm trong giá trị cho trước
    },
    ratings: [
        {
            star: {
                type: Number
            },
            votedBy: {
                type: mongoose.Types.ObjectId,
                ref: 'User'
            },
            comment: {
                type: String
            }
        }
    ],
    totalRatings: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema)