const { MONGOOSE_ERRORS, STATUS } = require('./constants');

/** Обработчик ошибок
 * @param error - ошибка от сервера Mongoose: {name: имя ошибки}, {statusCode: статус ошибки},
 * {message: текст сообщения об ошибке}, {code: код ошибки БД}.
 * Если name, statusCode, code или message не заданы, будет задано значение statusCode 500.
 * @param response - ответ
 */
const errorHandler = (error, response) => {
  const statusCode = error.statusCode || MONGOOSE_ERRORS[error.name || error.message || error.code] || 500;
  response.status(statusCode).send({ message: STATUS[statusCode] });
};

module.exports = {
  errorHandler,
};
