const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Types.ObjectId,
            ref: 'Product'
        },
        count: Number,
        color: String
    }],
    status: {
        type: String,
        default: 'Processing',
        enum: ['Cancelled', 'Processing', 'Success']
    },
    paymentIntent: {}, // Phương thức thanh toán
    orderBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Order', orderSchema)