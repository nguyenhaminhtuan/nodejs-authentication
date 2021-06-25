const pino = require('pino');
const config = require('../common/config');

const logger = pino({
  name: config.get('APP_NAME'),
  level: config.get('LOG_LEVEL'),
  timestamp: true,
  prettyPrint: config.get('NODE_ENV') !== 'production' && {
    colorize: true,
    singleLine: true,
    translateTime: 'yyyy-mm-dd hh:mm:ss',
  },
});

module.exports = logger;
