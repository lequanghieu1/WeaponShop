const express = require('express')
const router = express.Router()
const ModelDeviceController = require('../Controllers/ModelDeviceController');
const checkAuth = require('../middleware/AuthMiddleware')

router.get('/', ModelDeviceController.index)
router.post('/',checkAuth.add, ModelDeviceController.create)
router.put('/:id', ModelDeviceController.update)
router.delete('/:id',checkAuth.delete, ModelDeviceController.delete)

module.exports = router