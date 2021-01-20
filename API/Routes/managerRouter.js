const express = require('express')
const router = express.Router()
const managerController = require('../Controllers/ManagerController');
const checkAuth = require('../middleware/AuthMiddleware')

router.get('/', managerController.index)
router.post('/', checkAuth.add, managerController.create)
router.put('/:id', managerController.update)
router.delete('/:id', checkAuth.delete, managerController.delete)

module.exports = router