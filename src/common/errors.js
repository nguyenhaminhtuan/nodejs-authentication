'use strict';
class AppError extends Error {
  /**
   * @param {string} name
   * @param {string} message
   * @param {boolean} isOperational
   */
  constructor(name, message, isOperational = true) {
    super(message);
    this.name = name;
    this.isOperational = isOperational;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }
}

class HttpError extends AppError {
  /**
   * @param {string} name
   * @param {string} message
   * @param {number} statusCode
   */
  constructor(name, message, statusCode) {
    super(name, message);
    this.statusCode = statusCode;
  }
}

class InternalServerError extends AppError {
  /**
   * @param {string} message
   */
  constructor(message = 'Internal Server Error') {
    super(InternalServerError.name, message);
    this.statusCode = 500;
  }
}

class NotFoundError extends AppError {
  /**
   * @param {string} message
   */
  constructor(message = 'Not Found') {
    super(NotFoundError.name, message);
    this.statusCode = 404;
  }
}

class BadRequestError extends AppError {
  /**
   * @param {string} message
   */
  constructor(message = 'Bad Request') {
    super(BadRequestError.name, message);
    this.statusCode = 400;
  }
}

class ValidationError extends AppError {
  /**
   * @param {string} message
   */
  constructor(message = 'Validation Error') {
    super(ValidationError.name, message);
    this.statusCode = 400;
  }
}

module.exports = {
  AppError,
  HttpError,
  InternalServerError,
  NotFoundError,
  BadRequestError,
  ValidationError,
};
