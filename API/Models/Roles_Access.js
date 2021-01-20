const mongoose = require('mongoose');
const Roles_Access = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id_extra: { type: String, required: true },
    name_model: { type: String, required: true },
    read: { type: Boolean, default: false, required: true },
    add: { type: Boolean, default: false, required: true },
    delete: { type: Boolean, default: false, required: true },
    update: { type: Boolean, default: false, required: true },
}, {
    timestamps: true
});
module.exports = mongoose.model('Roles_Access', Roles_Access);