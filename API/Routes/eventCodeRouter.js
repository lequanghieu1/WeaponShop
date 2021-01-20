const express = require('express')
const router = express.Router()
const EventCodeController = require('../Controllers/EventCodeController');
const checkAuth = require('../middleware/AuthMiddleware')

router.get('/', EventCodeController.index)
router.post('/', checkAuth.add, EventCodeController.create)
router.put('/:id', EventCodeController.update)
router.delete('/:id', checkAuth.delete, EventCodeController.delete)

module.exports = router