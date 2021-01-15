const express = require('express')
const router = express.Router()
const managerController = require('../Controllers/ManagerController');

router.get('/', managerController.index)
router.post('/', managerController.create)
router.put('/:id', managerController.update)
router.delete('/:id', managerController.delete)

module.exports = router