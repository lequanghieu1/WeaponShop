const Roles_Access = require('../Models/Roles_Access');
const mongoose = require('mongoose')
exports.index = async (req, res, next) => {
    try {

        Roles_Access.find()
            .then(data => res.status(200).json(data))
            .catch(next);

    } catch (e) {
        console.log(e)
    }
}
exports.create = async (req, res, next) => {
    const ra = new Roles_Access(req.body);
    ra._id = new mongoose.Types.ObjectId
    ra.save()
    res.send('save success')
}
exports.update = async (req, res, next) => {
    Roles_Access.updateOne({ _id: req.params.id }, req.body)
        .then(() => res.send('success'))
        .catch(err => console.log(err))
}
exports.delete = async (req, res, next) => {
    Roles_Access.deleteOne({ _id: req.params.id })
        .then(() => res.send('success'))
        .catch(err => console.log(err))
}

