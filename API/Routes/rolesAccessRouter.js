const express = require('express')
const router = express.Router()
const RolesAccessController = require('../Controllers/RolesAccessController');
const checkAuth = require('../middleware/AuthMiddleware')

router.get('/', RolesAccessController.index)
router.post('/', RolesAccessController.create)
router.put('/:id', RolesAccessController.update)
router.delete('/:id',  RolesAccessController.delete)

module.exports = router