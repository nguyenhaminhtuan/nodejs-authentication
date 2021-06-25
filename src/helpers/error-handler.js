'use strict';
const config = require('../common/config');
const {
  AppError,
  InternalServerError,
  NotFoundError,
} = require('../common/errors');

/**
 * @param {Error} err
 * @returns {boolean}
 */
function isNonTrustedError(err) {
  if (err instanceof AppError && err.isOperational) {
    return false;
  }

  return true;
}

/**
 * @type {import('express').Handler}
 */
function handleNotFound(req, res, next) {
  return next(new NotFoundError());
}

/**
 * @type {import('express').ErrorRequestHandler}
 */
function handleError(err, req, res, next) {
  if (config.get('env') === 'production') {
    if (!isNonTrustedError(err)) {
      return res
        .status(err.statusCode)
        .json({ error: err.name, message: err.message });
    }

    const error = new InternalServerError();
    res.status(500).json({ error: error.name, message: error.message });
    process.exit(1);
  }

  res
    .status(err.statusCode || 500)
    .json({ error: err.name, message: err.message });

  if (!(err instanceof AppError)) {
    process.exit(1);
  }
}

module.exports = {
  isNonTrustedError,
  handleNotFound,
  handleError,
};
