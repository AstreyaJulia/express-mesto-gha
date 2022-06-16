/** Объект для статусов HTTP
 * @type Object
 */
const STATUS = {
  200: 'Выполнено без ошибок',
  201: 'Ресурс создан',
  400: 'Переданы некорректные данные',
  404: 'Запрашиваемый ресурс не найден',
  500: 'Ошибка сервера',
};

/** Объект для ошибок Mongoose и их перевода в HTTP-статусы
 * @type Object
 */
const MONGOOSE_ERRORS = {
  ValidationError: 400,
  CastError: 400,
  DocumentNotFoundError: 404,
};

module.exports = {
  STATUS,
  MONGOOSE_ERRORS,
};
