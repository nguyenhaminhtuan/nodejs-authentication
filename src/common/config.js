'use strict';
const convict = require('convict');
const configFormat = require('convict-format-with-validator');
require('dotenv').config();

convict.addFormat(configFormat.email);
convict.addFormat(configFormat.ipaddress);
convict.addFormat(configFormat.url);
convict.addFormat({
  name: 'array-by-comma',
  validate: (val, { arg, env }) => {
    if (typeof val !== 'string') {
      throw new Error(`${arg || env} must be string`);
    }
  },
  coerce: (val) => {
    return val.split(',');
  },
});

module.exports = convict({
  env: {
    env: 'NODE_ENV',
    format: ['production', 'development', 'test'],
    default: 'development',
  },
  app: {
    name: {
      env: 'APP_NAME',
      format: String,
      default: 'nodejs-authentication',
    },
    host: {
      env: 'HOST',
      format: 'ipaddress',
      default: '127.0.0.1',
    },
    port: {
      env: 'PORT',
      format: 'port',
      default: 8080,
    },
    logLevel: {
      env: 'LOG_LEVEL',
      format: ['trace', 'debug', 'info', 'warn', 'error', 'fatal'],
      default: 'debug',
    },
    allowedHosts: {
      env: 'ALLOWED_HOSTS',
      format: 'array-by-comma',
      default: [],
    },
  },
});
