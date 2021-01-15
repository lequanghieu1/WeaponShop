const Event_Code = require('../Models/Event_Code');
const mongoose = require('mongoose')

exports.index = async (req, res, next) => {
    try {
        await Event_Code.find()
            .then(data => res.status(200).json(data))
            .catch(next);

    } catch (e) {
        console.log(e)
    }
}
exports.create = async (req, res, next) => {
    let event_code_data = req.body
    if (event_code_data.code < 1 || event_code_data.name.trim().length < 1) { return res.status(304).json({ status: 205, error: `please fill` }) }
    try {
        let event_code_exist = await Event_Code.findOne({ code: event_code_data.code })
        if (event_code_exist) { return res.status(200).json({ status: 205, error: `Code ${event_code_data.code} is exist` }) }
        const new_event_code = new Event_Code({
            _id: new mongoose.Types.ObjectId,
            code: event_code_data.code,
            name: event_code_data.name
        })
        let result = await new_event_code.save()
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
    let event_code_data = req.body
    try {
        let del = await Event_Code.findById(id)
        if (!del) { return res.status(404).json({ err: 'id is not exits' }) }
        let event_code_exist = await Event_Code.findOne({ code: event_code_data.code })
        if (event_code_exist) { return res.status(200).json({ status: 205, error: `Code ${event_code_data.code} is exist` }) }
        let edit = { 'code': event_code_data.code ? event_code_data.code : del.code, 'name': event_code_data.name ? event_code_data.name : del.name }
        let result = await Event_Code.updateOne({ _id: id }, { $set: edit })
        return result.ok > 0 ? res.status(200).json({ mes: 'successfully' }) : res.status(304).json({ mes: 'fail' })
    } catch (error) {
        res.status(500).json({ status: 500, error: error })
    }
}
exports.delete = async (req, res, next) => {
    const id = req.params.id
    try {
        let del = await Event_Code.findById(id)
        if (!del) { return res.status(404).json({ err: 'id is not exits' }) }
        let result = await Event_Code.deleteOne({ _id: id })
        return result.ok > 0 ? res.status(200).json({ mes: 'successfully' }) : res.status(304).json({ mes: 'fail' })

    } catch (err) {
        console.log(err)
    }
}



