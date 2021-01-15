const mongoose = require('mongoose');
const PageSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    page: { type: String, required: true },
    key: { type: String, required: true },
    label: { type: String, required: true },
    sortable: { type: Boolean, required: true ,default:false},
    selected: { type: Boolean, required: true ,default:false},
}, {
    timestamps: true
});
module.exports = mongoose.model('PageSchema', PageSchema);