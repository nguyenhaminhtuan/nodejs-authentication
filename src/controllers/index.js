'use strict';
const { Router } = require('express');
const healthController = require('./health');
const authController = require('./auth');

const router = Router();

router.use('/healthcheck', healthController);
router.use('/auth', authController);

module.exports = router;
