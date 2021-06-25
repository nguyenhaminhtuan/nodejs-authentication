'use strict';
const { Router } = require('express');
const catchAsync = require('../helpers/catch-async');

const router = Router();

router.get(
  '/',
  catchAsync(async (req, res) => {
    return res.status(200).json({ status: 'ok' });
  })
);

module.exports = router;
