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
      default: 'trace',
    },
    allowedHosts: {
      env: 'ALLOWED_HOSTS',
      format: 'array-by-comma',
      default: [],
    },
  },
  db: {
    host: {
      env: 'DB_HOST',
      format: String,
      default: 'localhost',
    },
    port: {
      env: 'DB_PORT',
      format: 'port',
      default: 5432,
    },
    database: {
      env: 'DB_DATABASE',
      format: String,
      default: 'auth',
    },
    user: {
      env: 'DB_USER',
      format: String,
      default: 'postgres',
    },
    password: {
      env: 'DB_PASSWORD',
      format: String,
      default: 'admin',
      sensitive: true,
    },
  },
  redis: {
    host: {
      env: 'REDIS_HOST',
      format: String,
      default: '127.0.0.1',
    },
    port: {
      env: 'REDIS_PORT',
      format: 'port',
      default: 6379,
    },
    password: {
      env: 'REDIS_PASSWORD',
      format: String,
      default: null,
      sensitive: true,
    },
  },
  session: {
    secret: {
      env: 'SESSION_SECRET',
      format: String,
      default: 'meowmeowmeow',
      sensitive: true,
    },
    timeout: {
      env: 'SESSION_TIMEOUT',
      format: 'int',
      default: 30 * 60 * 1000,
    },
  },
});
