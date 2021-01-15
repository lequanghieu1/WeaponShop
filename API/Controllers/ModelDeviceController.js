const Model_Device = require('../Models/Model_Device');

exports.index = async (req, res, next) => {
    try {

        Model_Device.find()
            .then(data => res.status(200).json(data))
            .catch(next);

    } catch (e) {
        console.log(e)
    }
}
exports.create = async (req, res, next) => {
    const md = new Model_Device(req.body);
    md.save();
    res.send('save success')
}
exports.update = async (req, res, next) => {
    Model_Device.updateOne({ _id: req.params.id }, req.body)
        .then(() => res.send('success'))
        .catch(err => console.log(err))
}
exports.delete = async (req, res, next) => {
    Model_Device.deleteOne({ _id: req.params.id })
        .then(() => res.send('success'))
        .catch(err => console.log(err))
}

