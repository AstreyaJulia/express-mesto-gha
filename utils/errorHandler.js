const { MONGOOSE_ERRORS, STATUS } = require('./constants');

/** Обработчик ошибок
 * @param error - ошибка от сервера Mongoose {name: имя ошибки}, либо {statusCode: статус ошибки}.
 * Если name или statusCode не заданы, будет задано значение statusCode 500.
 * @param response - ответ
 */
const errorHandler = (error, response) => {
  // Конвертирование ошибок mongoose
  if (error.name) {
    error.statusCode = MONGOOSE_ERRORS[error.name] || 500;
  }
  response.status(error.statusCode || 500).send({ message: STATUS[error.statusCode || 500] });
};

module.exports = {
  errorHandler,
};
