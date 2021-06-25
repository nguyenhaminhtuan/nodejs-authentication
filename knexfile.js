'use strict';
const config = require('./src/common/config');

module.exports = {
  client: 'pg',
  connection: {
    host: config.get('db.host'),
    port: config.get('db.port'),
    database: config.get('db.database'),
    user: config.get('db.user'),
    password: config.get('db.password'),
  },
};