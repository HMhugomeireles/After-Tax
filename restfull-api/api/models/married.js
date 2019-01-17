const mongoose = require('mongoose');

const modelSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    tier: {
        type: Number,
        required: true
    },
    children0: {
        type: Number,
        required: true
    },
    children1: {
        type: Number,
        required: true
    },
    children2: {
        type: Number,
        required: true
    },
    children3: {
        type: Number,
        required: true
    },
    children4: {
        type: Number,
        required: true
    },
    children5: {
        type: Number,
        required: true
    }
}, {timestamps: true} );

module.exports = mongoose.model('Married', modelSchema);