const express = require('express')
const router = express.Router()
const RolesAccessController = require('../Controllers/RolesAccessController');
const checkAuth = require('../middleware/AuthMiddleware')

router.get('/', RolesAccessController.index)
router.post('/', checkAuth.add, RolesAccessController.create)
router.put('/:id', RolesAccessController.update)
router.delete('/:id', checkAuth.delete, RolesAccessController.delete)

module.exports = router