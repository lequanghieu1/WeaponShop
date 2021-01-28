const mongoose = require('mongoose');
const PageSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    page: { type: String, required: true },
    key: { type: String, required: true },
    label: { type: String, required: true },
    sortable: { type: Boolean, required: true },
    selected: { type: Boolean, required: true },
}, {
    timestamps: true
});
module.exports = mongoose.model('PageSchema', PageSchema);