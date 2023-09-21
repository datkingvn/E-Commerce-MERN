const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    address: {

    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Address', addressSchema)