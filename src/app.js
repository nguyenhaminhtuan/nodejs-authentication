'use strict';
const express = require('express');
const cors = require('cors');
const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const config = require('./common/config');
const httpLogger = require('./helpers/http-logger');
const errorHandler = require('./helpers/error-handler');
const controller = require('./controllers');

const app = express();
const redisClient = redis.createClient({
  host: config.get('redis.host'),
  port: config.get('redis.port'),
  password: config.get('redis.password'),
});

app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(httpLogger);
app.use(cors({ origin: config.get('app.allowedHosts') }));
app.use(
  session({
    secret: config.get('session.secret'),
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({ client: redisClient }),
    cookie: {
      path: '/',
      maxAge: config.get('session.timeout'),
      httpOnly: true,
      secure: config.get('env') === 'production',
    },
  })
);

app.use(controller);
app.use(errorHandler.handleNotFound);
app.use(errorHandler.handleError);

module.exports = app;
