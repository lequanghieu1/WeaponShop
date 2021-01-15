const express = require('express')
const router = express.Router();
const routerManager = require('./managerRouter');
const routerEventCode = require('./eventCodeRouter');
const routerModelDevice = require('./modelDeviceRouter');
const routerPageChema = require('./pageSchemaRouter');
const routerRolesAccess = require('./rolesAccessRouter');


router.use("/manager",routerManager)
router.use("/event-code",routerEventCode)
router.use("/model-device",routerModelDevice)
router.use("/page-schema",routerPageChema)
router.use("/roles-access",routerRolesAccess)

module.exports = router