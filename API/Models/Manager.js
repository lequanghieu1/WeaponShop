const mongoose = require('mongoose');
const Manager = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_name: { type: String, required: true },
    password: { type: String, required: true },
    full_name: { type: String, required: true },
    is_login: { type: Boolean, required: true }
}, {
    timestamps: true
})
module.exports = mongoose.model('Manager', Manager);