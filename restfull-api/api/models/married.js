const mongoose = require('mongoose');

const modelSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    tier: Number,
    children0: Number,
    children1: Number,
    children2: Number,
    children3: Number,
    children4: Number,
    children5: Number,
});

module.exports = mongoose.model('Married', modelSchema);