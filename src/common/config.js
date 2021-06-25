'use strict';
const convict = require('convict');
const configFormat = require('convict-format-with-validator');
require('dotenv').config();

convict.addFormat(configFormat.email);
convict.addFormat(configFormat.ipaddress);
convict.addFormat(configFormat.url);

module.exports = convict({
  NODE_ENV: {
    env: 'NODE_ENV',
    format: ['production', 'development', 'test'],
    default: 'development',
  },
  APP_NAME: {
    env: 'APP_NAME',
    format: String,
    default: 'nodejs-authentication',
  },
  HOST: {
    env: 'HOST',
    format: 'ipaddress',
    default: '127.0.0.1',
  },
  PORT: {
    env: 'PORT',
    format: 'port',
    default: 8080,
  },
  LOG_LEVEL: {
    env: 'LOG_LEVEL',
    format: ['trace', 'debug', 'info', 'warn', 'error', 'fatal'],
    default: 'debug',
  },
});
