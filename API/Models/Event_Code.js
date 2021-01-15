const mongoose = require('mongoose');
const Event_code = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    code: { type: Number, index: true },
    name: { type: String, required: true },
});
module.exports = mongoose.model('Event_code', Event_code);