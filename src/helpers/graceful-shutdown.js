'use strict';
const { promisify } = require('util');
const db = require('../db');
const logger = require('../utils/logger');
const errorHandler = require('./error-handler');

const delay = promisify(setTimeout);

/**
 * @param {import('http').Server} server
 * @param {{ timeout: number }} opts
 */
module.exports = function (server, { timeout = 1000 }) {
  const exitWithCode = (code) => {
    logger.info('Start graceful shutdown');
    server.close(async (err) => {
      if (err) {
        logger.fatal({ err }, err.message);
        process.exit(1);
      }

      await delay(timeout);
      await db.destroy();
      logger.info('Server closed');
      process.exit(code);
    });
  };

  const onSignal = (signal) => {
    logger.info(`${signal} received`);
    exitWithCode(0);
  };

  const onError = (err) => {
    if (errorHandler.isNonTrustedError(err)) {
      logger.fatal({ err }, err.message);
    } else {
      logger.error({ err }, err.message);
    }

    exitWithCode(1);
  };

  process.on('SIGTERM', onSignal);
  process.on('SIGINT', onSignal);
  process.on('unhandledRejection', onError);
  process.on('uncaughtException', onError);
};
