'use strict';
const http = require('http');
const app = require('./app');
const config = require('./common/config');
const logger = require('./utils/logger');
const gracefulShutdown = require('./helpers/graceful-shutdown');

const server = http.createServer(app);

server.listen(config.get('app.port'), config.get('app.host'), () => {
  const addy = server.address();
  logger.info(`Server running on http://${addy.address}:${addy.port}`);
});

gracefulShutdown(server, 1000);
