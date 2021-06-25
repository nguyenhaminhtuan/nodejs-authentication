'use strict';
const { Router } = require('express');
const healthController = require('./health');

const router = Router();

router.use('/healthcheck', healthController);

module.exports = router;
