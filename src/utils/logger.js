'use strict';
const pino = require('pino');
const config = require('../common/config');

const logger = pino({
  name: config.get('app.name'),
  level: config.get('app.logLevel'),
  timestamp: true,
  prettyPrint: config.get('env') !== 'production' && {
    colorize: true,
    singleLine: true,
    translateTime: 'yyyy-mm-dd hh:mm:ss',
  },
});

module.exports = logger;
