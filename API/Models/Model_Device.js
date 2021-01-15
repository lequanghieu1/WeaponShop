const mongoose = require('mongoose');
const Model_Device = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    code: { type: String, required: true },
});
module.exports = mongoose.model('Model_Device', Model_Device);