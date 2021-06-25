'use strict';
const express = require('express');
const cors = require('cors');
const httpLogger = require('./helpers/http-logger');
const errorHandler = require('./helpers/error-handler');
const controller = require('./controllers');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(httpLogger);
app.use(cors({ origin: true }));
app.use(controller);
app.use(errorHandler.handleNotFound);
app.use(errorHandler.handleError);

module.exports = app;
