const express = require('express')
const router = express.Router();
const routerManager = require('./managerRouter');
const managerController = require('../Controllers/ManagerController')
const routerEventCode = require('./eventCodeRouter');
const routerModelDevice = require('./modelDeviceRouter');
const routerPageChema = require('./pageSchemaRouter');
const routerRolesAccess = require('./rolesAccessRouter');
const AuthController = require("../Controllers/AuthController");

router.post("/login", AuthController.login);
router.post("/register", managerController.create);
router.post("/forgot",AuthController.forgot)
router.post("/reset",AuthController.update)
router.use("/manager", routerManager)
router.use("/event-code", routerEventCode)
router.use("/model-device", routerModelDevice)
router.use("/page-schema", routerPageChema)
router.use("/roles-access", routerRolesAccess)

module.exports = router
