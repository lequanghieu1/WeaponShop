const express = require('express')
const router = express.Router()
const ModelDeviceController = require('../Controllers/ModelDeviceController');

router.get('/', ModelDeviceController.index)
router.post('/', ModelDeviceController.create)
router.put('/:id', ModelDeviceController.update)
router.delete('/:id', ModelDeviceController.delete)

module.exports = router