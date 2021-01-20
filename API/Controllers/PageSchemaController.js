const Page_Schema = require('../Models/PageSchema');
const Roles_Access = require('../Models/Roles_Access');
const mongoose = require('mongoose')


exports.index = async (req, res, next) => {
    try {
        await Page_Schema.find()
            .then(data => res.status(200).json(data))
            .catch(next);

    } catch (e) {
        console.log(e)
    }
}
exports.create = async (req, res, next) => {
    let page_schema_data = req.body
    if (page_schema_data.page.trim().length < 1 || page_schema_data.key.trim().length < 1 || page_schema_data.label.trim().length < 1) { return res.status(304).json({ status: 205, error: `please fill` }) };
    try {
        let page_schema_exist = await Page_Schema.findOne({ code: page_schema_data.page })
        if (page_schema_exist) { return res.status(200).json({ status: 205, error: `Code ${page_schema_data.page} is exist` }) }
        const new_page_schema = new Page_Schema({
            _id: new mongoose.Types.ObjectId,
            page: page_schema_data.page,
            key: page_schema_data.key,
            label: page_schema_data.label,
            sortable: page_schema_data.sortable,
            selected: page_schema_data.selected
        })
        let result = await new_page_schema.save()
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
    let page_schema_data = req.body
    try {
        let del = await Page_Schema.findById(id)
        if (!del) { return res.status(404).json({ err: 'id is not exits' }) }
        let edit = { 'page': page_schema_data.page ? page_schema_data.page : del.page, 'key': page_schema_data.key ? page_schema_data.key : del.key, 'label': page_schema_data.label ? page_schema_data.label : del.label, 'sortable': page_schema_data.sortable ? page_schema_data : del.sortable, 'selected': page_schema_data.selected ? page_schema_data.selected : del.selected }
        let result = await Page_Schema.updateOne({ _id: id }, { $set: edit })
        return result.ok > 0 ? res.status(200).json({ mes: 'successfully' }) : res.status(304).json({ mes: 'fail' })
    } catch (error) {
        res.status(500).json({ status: 500, error: error })
    }
}
exports.delete = async (req, res, next) => {
    const id = req.params.id
    try {
        let del = await Page_Schema.findById(id)
        if (!del) { return res.status(404).json({ err: 'id is not exits' }) }
        let result = await Page_Schema.deleteOne({ _id: id })
        return result.ok > 0 ? res.status(200).json({ mes: 'successfully' }) : res.status(304).json({ mes: 'fail' })

    } catch (err) {
        console.log(err)
    }
}
