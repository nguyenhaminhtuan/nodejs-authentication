'use strict';
const logger = require('../utils/logger');
const userService = require('./user');
const { UnauthorizedError, ConflictError } = require('../common/errors');
const bcrypt = require('bcrypt');

/**
 * @param {string} email
 * @param {string} password
 */
async function loginWithEmailPasswrod(email, password) {
  logger.debug('start login with email and password');
  const user = await userService.getUserByEmail(email);

  if (!user) {
    throw new UnauthorizedError('Email or password not match');
  }

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    throw new UnauthorizedError('Email or password not match');
  }

  logger.info({ id: user.id, email: user.email }, 'user logged in');
  return user;
}

/**
 * @param {string} email
 * @param {string} password
 */
async function registerWithEmailPassword(email, password, full_name) {
  logger.debug('start register with email and password');
  const isExisted = await userService.getUserByEmail(email);

  if (isExisted) {
    throw new ConflictError('Email already taken');
  }

  const hashed = await bcrypt.hash(password, 12);
  const user = await userService.create({ email, password: hashed, full_name });
  logger.info({ id: user.id, email: user.email }, 'user registed');

  return user;
}

module.exports = {
  loginWithEmailPasswrod,
  registerWithEmailPassword,
};
