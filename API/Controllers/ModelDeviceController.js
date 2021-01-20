const Model_Device = require('../Models/Model_Device');
const Roles_Access = require('../Models/Roles_Access');
const mongoose = require('mongoose')

exports.index = async (req, res, next) => {
    try {
        await Model_Device.find()
            .then(data => res.status(200).json(data))
            .catch(next);

    } catch (e) {
        console.log(e)
    }
}
exports.create = async (req, res, next) => {
    let model_device_data = req.body
    if (model_device_data.code.trim().length < 1 || model_device_data.name.trim().length < 1) { return res.status(304).json({ status: 205, error: 'please fill' }) }
    try {
        let model_device_exist = await Model_Device.findOne({ code: model_device_data.code })
        if (model_device_exist) { return res.status(200).json({ status: 205, error: `Code ${model_device_data.code} is exist` }) }
        const new_model_device = new Model_Device({
            _id: new mongoose.Types.ObjectId,
            code: model_device_data.code,
            name: model_device_data.name
        })
        let result = await new_model_device.save()
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
    let model_device_data = req.body
    try {
        let del = await Model_Device.findById(id)
        if (!del) { return res.status(404).json({ err: 'id is not exits' }) }
        let edit = { 'code': model_device_data.code ? model_device_data.code : del.code, 'name': model_device_data.name ? model_device_data.name : del.name }
        let result = await Model_Device.updateOne({ _id: id }, { $set: edit })
        return result.ok > 0 ? res.status(200).json({ mes: 'successfully' }) : res.status(304).json({ mes: 'fail' })
    } catch (error) {
        res.status(500).json({ status: 500, error: error })
    }
}
exports.delete = async (req, res, next) => {
    const id = req.params.id
    try {
        let del = await Model_Device.findById(id)
        if (!del) { return res.status(404).json({ err: 'id is not exits' }) }
        let result = await Model_Device.deleteOne({ _id: id })
        return result.ok > 0 ? res.status(200).json({ mes: 'successfully' }) : res.status(304).json({ mes: 'fail' })

    } catch (err) {
        console.log(err)
    }
}

