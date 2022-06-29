const AppError = require('./app-error');

class AuthError extends AppError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = AuthError;
