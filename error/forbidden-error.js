const AppError = require('./app-error');

class ForbiddenError extends AppError {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
