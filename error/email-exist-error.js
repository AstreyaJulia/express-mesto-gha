const AppError = require('./app-error');

class EmailExistError extends AppError {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = EmailExistError;
