const mongoose = require('mongoose');
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
let id
const Roles_Access = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id_extra: { type: String, default: makeid(8) },
    name_model: { type: String, required: true },
    read: { type: Boolean, default: false, required: true },
    add: { type: Boolean, default: false, required: true },
    delete: { type: Boolean, default: false, required: true },
    update: { type: Boolean, default: false, required: true },
}, {
    timestamps: true
});
module.exports = mongoose.model('Roles_Access', Roles_Access);