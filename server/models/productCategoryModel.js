const mongoose = require('mongoose')

// Product collection schema
const productCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    brand: {
        type: Array,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ProductCategory', productCategorySchema)