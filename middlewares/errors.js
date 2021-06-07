/* eslint-disable linebreak-style */
/* eslint-disable max-classes-per-file */
/* eslint-disable linebreak-style */
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class DuplicateEmailError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = {
  NotFoundError, ValidationError, DuplicateEmailError, UnauthorizedError,
};
