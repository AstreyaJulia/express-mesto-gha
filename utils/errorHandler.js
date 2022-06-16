const { MONGOOSE_ERRORS, STATUS } = require('./constants');

/** Обработчик ошибок
 * @param error - ошибка от сервера Mongoose {name: имя ошибки}, либо {statusCode: статус ошибки}.
 * Если name или statusCode не заданы, будет задано значение statusCode 500.
 * @param response - ответ
 */
const errorHandler = (error, response) => {
  const statusCode = error.statusCode || MONGOOSE_ERRORS[error.name] || 500;
  response.status(statusCode).send({ message: STATUS[statusCode] });
};

module.exports = {
  errorHandler,
};
