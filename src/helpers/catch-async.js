'use strict';
/**
 * @param {(req: import('express').Request, res: import('express').Response) => Promise<unknown>} handler
 * @returns {void}
 */
module.exports = function (handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (error) {
      next(error);
    }
  };
};
