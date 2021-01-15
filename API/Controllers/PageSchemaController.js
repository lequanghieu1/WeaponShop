const Page_Schema = require('../Models/PageSchema');

exports.index = async (req, res, next) => {
    try {

        Page_Schema.find()
            .then(data => res.status(200).json(data))
            .catch(next);

    } catch (e) {
        console.log(e)
    }
}
exports.create = async (req, res, next) => {
    const ps = new Page_Schema(req.body);
    ps.save();
    res.send('save success')
}
exports.update = async (req, res, next) => {
    Page_Schema.updateOne({ _id: req.params.id }, req.body)
        .then(() => res.send('success'))
        .catch(err => console.log(err))
}
exports.delete = async (req, res, next) => {
    Page_Schema.deleteOne({ _id: req.params.id })
        .then(() => res.send('success'))
        .catch(err => console.log(err))
}
