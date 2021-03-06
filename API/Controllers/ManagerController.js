const { validateInfoManager } = require('../Untils/Validator')
const Manager = require('../Models/Manager');
const RolesAccess = require('../Models/Roles_Access');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');


exports.index = async (req, res, next) => {
    try {
        await Manager.find()
            .then(managers => res.status(200).json(managers))
            .catch(next);
    } catch (e) {
        res.json({
            result: "OK"
        })
    }
}
exports.create = async (req, res, next) => {
    let manager_data = req.body
    if (!validateInfoManager(manager_data)) {
        return res.status(409).json({
            error: {
                message: 'Invalid credentials'
            }
        })
    }
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(manager_data.password, salt)
    try {
        let man = await Manager.findOne({ user_name: req.body.user_name.toLowerCase() })
        if (man) { return res.status(200).json({ status: 205, err: `username ${man.user_name} is exits` }) }
        const new_man = new Manager({
            _id: new mongoose.Types.ObjectId,
            user_name: manager_data.user_name.toLowerCase(),
            password: passwordHash,
            full_name: manager_data.full_name,
            is_login: manager_data.is_login
        })
        let result = await new_man.save()
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
    let manager_data = req.body
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(manager_data.password, salt)
    manager_data.password = passwordHash
    try {
        let del = await Manager.findById(id)
        if (!del) { return res.status(404).json({ err: 'id is not exits' }) }
        let edit = { 'password': manager_data.password ? manager_data.password : del.password, 'full_name': manager_data.full_name ? manager_data.full_name : del.full_name, 'is_login': manager_data.is_login }
        let result = await Manager.updateOne({ _id: id }, { $set: edit })
        return result.ok > 0 ? res.status(200).json({ mes: 'successfully,but you can not update username' }) : res.status(304).json({ mes: 'fail' })
    } catch (error) {
        res.status(500).json({ status: 500, error: error })
    }
}
exports.delete = async (req, res, next) => {
    const id = req.params.id
    try {
        let del = await Manager.findById(id)
        if (!del) { return res.status(404).json({ err: 'id is not exits' }) }
        let result = await Manager.deleteOne({ _id: id })
        await RolesAccess.deleteOne({ id_extra: id })
        return result.ok > 0 ? res.status(200).json({ mes: 'delete successfully and your rules also delete' }) : res.status(304).json({ mes: 'fail' })

    } catch (err) {
        console.log(err)
    }
}


