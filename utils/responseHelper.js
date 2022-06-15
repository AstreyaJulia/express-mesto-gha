/** Обработчик ответа
 * @param dataObject
 * @param status - ошибка от сервера, либо {status: номер статуса}, либо null, если нет ошибки
 * @param response - ответ
 */
const responseHelper = (dataObject, status, response) => {
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

  // Без ошибок. Статусы от 200 до 299
  if (dataObject && !status.name && (status.statusCode >= 200 || status.statusCode < 300)) {
    const { ...data } = dataObject;
    response.status(status.statusCode).send({ ...data, message: STATUS[status.statusCode] });
  } else if (status.statusCode >= 400 || status.name) {
    // Ошибки Mongoose (status['name']) и статусы >= 400
    // Конвертирование ошибок mongoose
    if (status.name) {
      status.statusCode = MONGOOSE_ERRORS[status.name];
    }
    response.status(status.statusCode).send({ message: STATUS[status.statusCode] });
  }
};

module.exports = {
  responseHelper,
};
