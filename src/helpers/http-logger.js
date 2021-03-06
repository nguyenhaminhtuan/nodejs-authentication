'use strict';
const logger = require('../utils/logger');
const pinoHttp = require('pino-http');

module.exports = pinoHttp({
  logger,
  customLogLevel: function (res, err) {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return 'error';
    } else if (res.statusCode >= 500 || err) {
      return 'fatal';
    }
    return 'info';
  },
});
