const express = require('express')
const router = express.Router()
const RolesAccessController = require('../Controllers/RolesAccessController');

router.get('/', RolesAccessController.index)
router.post('/', RolesAccessController.create)
router.put('/:id', RolesAccessController.update)
router.delete('/:id', RolesAccessController.delete)

module.exports = router