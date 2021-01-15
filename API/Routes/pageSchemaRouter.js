const express = require('express')
const router = express.Router()
const PageSchemaController = require('../Controllers/PageSchemaController');

router.get('/', PageSchemaController.index)
router.post('/', PageSchemaController.create)
router.put('/:id', PageSchemaController.update)
router.delete('/:id', PageSchemaController.delete)

module.exports = router