'use strict';
const config = require('./src/common/config');
const logger = require('./src/utils/logger');

/**
 * @type {import('knex').Knex.Config}
 */
module.exports = {
  client: 'pg',
  connection: {
    host: config.get('db.host'),
    port: config.get('db.port'),
    database: config.get('db.database'),
    user: config.get('db.user'),
    password: config.get('db.password'),
  },
  debug: config.get('env') !== 'production',
  log: {
    debug: (message) => {
      logger.debug(message, 'Knex');
    },
    warn: (message) => {
      logger.warn(message, 'Knex');
    },
    error: (message) => {
      logger.error(message, 'Knex');
    },
    deprecate: (message) => {
      logger.warn(message, 'Knex');
    },
  },
};
