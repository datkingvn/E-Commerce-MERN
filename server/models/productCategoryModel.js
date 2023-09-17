const mongoose = require('mongoose')

// Product collection schema
const productCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('ProductCategory', productCategorySchema)