const express = require('express')
const router = express.Router()
const EventCodeController = require('../Controllers/EventCodeController');

router.get('/', EventCodeController.index)
router.post('/', EventCodeController.create)
router.put('/:id', EventCodeController.update)
router.delete('/:id', EventCodeController.delete)

module.exports = router