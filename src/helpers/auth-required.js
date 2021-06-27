'use strict';
const { UnauthorizedError } = require('../common/errors');

/**
 * @type {import('express').Handler}
 */
module.exports = function (req, res, next) {
  if (!req.session.user) {
    throw new UnauthorizedError();
  }

  return next();
};
