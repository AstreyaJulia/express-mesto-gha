class AppError extends Error {
  constructor(message, statusCode) {
    super();

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;

    this.message = message
      || 'На сервере произошла ошибка.';

    this.statusCode = statusCode || 500;
  }
}

module.exports = AppError;
