/** Объект для статусов HTTP
 * @type Object
 */
const STATUS = {
  200: 'Выполнено без ошибок',
  201: 'Ресурс создан',
  400: 'Переданы некорректные данные',
  401: 'Передан неверный логин или пароль',
  403: 'У вас нет прав на выполнение операции',
  404: 'Запрашиваемый ресурс не найден',
  409: 'Переданный e-mail уже зарегистрирован',
  500: 'На сервере произошла ошибка',
};

/** Объект для ошибок Mongoose и их перевода в HTTP-статусы
 * @type Object
 */
const MONGOOSE_ERRORS = {
  ValidationError: 400,
  CastError: 400,
  DocumentNotFoundError: 404,
  IncorrectEmail: 401,
  11000: 409,
  "Validation failed": 401
};

/** Secret key для генерации и валидации JWT
 * @type {string}
 */
const SECRET_KEY = '1nAzbR2082Htx4p5ddzxZZqlmcXNDgqfmT5PqyTk0H4OQtKfZHyjew2xUlhnD3X';

module.exports = {
  STATUS,
  MONGOOSE_ERRORS,
  SECRET_KEY,
};
