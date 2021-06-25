'use strict';
const http = require('http');
const app = require('./app');
const config = require('./common/config');
const logger = require('./utils/logger');
const errorHandler = require('./helpers/error-handler');

const server = http.createServer(app);

server.listen(config.get('PORT'), config.get('HOST'), () => {
  const addy = server.address();
  logger.info(`Server running on http://${addy.address}:${addy.port}`);
});

process.on('unhandledRejection', (error) => {
  throw error;
});
process.on('uncaughtException', (error) => {
  if (errorHandler.isNonTrustedError(error)) {
    process.exit(1);
  }
});
