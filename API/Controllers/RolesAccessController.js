const Roles_Access = require('../Models/Roles_Access');
const mongoose = require('mongoose')
exports.index = async (req, res, next) => {
    try {
        await Roles_Access.find()
            .then(data => res.status(200).json(data))
            .catch(next);
    } catch (e) {
        console.log(e)
    }
}
exports.create = async (req, res, next) => {
    let roles_access_data = req.body
    if (roles_access_data.name_model.trim().length < 1) { return res.status(304).json({ status: 205, error: `please fill` }) }
    try {
        let roles_access_exist = await Roles_Access.findOne({ code: roles_access_data.name_model })
        if (roles_access_exist) { return res.status(200).json({ status: 205, error: `Code ${roles_access_data.name_model} is exist` }) }
        const new_roles_access = new Roles_Access({
            _id: new mongoose.Types.ObjectId,
            read: roles_access_data.read,
            add: roles_access_data.add,
            update: roles_access_data.update,
            delete: roles_access_data.delete,
            name_model: roles_access_data.name_model
        })
        let result = await new_roles_access.save()
        res.status(200).json(result)

    } catch (error) {
        res.status(500).json({
            status: 500,
            error: error
        })
    }
}
exports.update = async (req, res, next) => {
    const id = req.params.id
    let roles_access_data = req.body
    try {
        let del = await Roles_Access.findById(id)
        if (!del) { return res.status(404).json({ err: 'id is not exits' }) }
        let edit = { 'read': roles_access_data.read ? roles_access_data.read : del.read, 'add': roles_access_data.add ? roles_access_data.add : del.add, 'update': roles_access_data.update ? roles_access_data.update : del.update, 'delete': roles_access_data.delete ? roles_access_data.delete : del.delete, 'name_model': roles_access_data.name_model ? roles_access_data.name_model : del.name_model }
        let result = await Event_Code.updateOne({ _id: id }, { $set: edit })
        return result.ok > 0 ? res.status(200).json({ mes: 'successfully' }) : res.status(304).json({ mes: 'fail' })
    } catch (error) {
        res.status(500).json({ status: 500, error: error })
    }
}
exports.delete = async (req, res, next) => {
    const id = req.params.id
    try {
        let del = await Roles_Access.findById(id)
        if (!del) { return res.status(404).json({ err: 'id is not exits' }) }
        let result = await Roles_Access.deleteOne({ _id: id })
        return result.ok > 0 ? res.status(200).json({ mes: 'successfully' }) : res.status(304).json({ mes: 'fail' })

    } catch (err) {
        console.log(err)
    }
}
// exports.update = async (req, res, next) => {
//     Roles_Access.updateOne({ _id: req.params.id }, req.body)
//         .then(() => res.send('success'))
//         .catch(err => console.log(err))
// }
// exports.delete = async (req, res, next) => {
//     Roles_Access.deleteOne({ _id: req.params.id })
//         .then(() => res.send('success'))
//         .catch(err => console.log(err))
// }

