'use strict';
const Ajv = require('ajv').default;
const { ValidationError } = require('../common/errors');

const ajv = new Ajv({ allErrors: true });

/**
 * @param {'query' | 'params' | 'body'} key
 * @param {import('ajv').Schema} schema
 * @returns {import('express').Handler}
 */
module.exports = function (key, schema) {
  return (req, res, next) => {
    const validate = ajv.compile(schema);
    const valid = validate(req[key]);

    if (!valid) {
      const err = new ValidationError();
      return res.status(err.statusCode).json({
        err: err.name,
        message: err.message,
        details: ajv.errorsText(validate.errors).split(','),
      });
    }

    return next();
  };
};
