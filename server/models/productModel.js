const mongoose = require('mongoose');

// Product collection schema
const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true // Sử dụng để xóa khoảng trắng (space) từ đầu và cuối chuỗi khi lưu trữ dữ liệu
    },
    slug: {
        type: String,
        required: true,
        // unique: true,
        lowercase: true
    },
    description: {
        type: Array,
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
        type: String,
        required: true
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
        required: true
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

// Check if the model already exists
const ProductModel = mongoose.models.Product
    ? mongoose.models.Product
    : mongoose.model('Product', ProductSchema);

module.exports = ProductModel;