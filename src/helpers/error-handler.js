'use strict';
const config = require('../common/config');
const {
  AppError,
  InternalServerError,
  NotFoundError,
} = require('../common/errors');

function isNonTrustedError(err) {
  if (err instanceof AppError && err.isOperational) {
    return false;
  }

  return true;
}

function handleNotFound(req, res, next) {
  return next(new NotFoundError());
}

function handleError(err, req, res, next) {
  if (config.get('NODE_ENV') === 'production') {
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
