const express = require('express')
const router = express.Router()
const PageSchemaController = require('../Controllers/PageSchemaController');
const checkAuth = require('../middleware/AuthMiddleware')

router.get('/', PageSchemaController.index)
router.post('/',  PageSchemaController.create)
router.put('/:id', PageSchemaController.update)
router.delete('/:id', checkAuth.delete, PageSchemaController.delete)

module.exports = router