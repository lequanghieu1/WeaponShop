const Event_Code = require('../Models/Event_Code');


exports.index = async (req, res, next) => {
    try {

        Event_Code.find()
            .then(data => res.status(200).json(data))
            .catch(next);

    } catch (e) {
        console.log(e)
    }
}
exports.create = async (req, res, next) => {
    const ec = new Event_Code(req.body);
    ec.save();
    res.send('save success')
}
exports.update = async (req, res, next) => {
    Event_Code.updateOne({ _id: req.params.id }, req.body)
        .then(() => res.send('success'))
        .catch(err => console.log(err))
}
exports.delete = async (req, res, next) => {
    Event_Code.deleteOne({ _id: req.params.id })
        .then(() => res.send('success'))
        .catch(err => console.log(err))
}


