/** Обработчик ответа
 * @param dataObject
 * @param error - ошибка от сервера, либо {status: номер статуса}, либо null, если нет ошибки
 * @param response - ответ
 */
const responseHelper = (dataObject, error, response) => {
  /** Объект для ошибок
   * @type Object
   */
  const ERRORS = {
    400: 'Переданы некорректные данные',
    404: 'Запрашиваемый ресурс не найден',
    500: 'Ошибка сервера',
  };

  // Если получили ошибку
  if (error) {
    // Ошибка на тот случай, если ни одно условие не подойдет
    let errorStatus = 500;

    // Ошибки валидации: не заполнено, не тот тип, и т.д.
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      errorStatus = 400;
    }

    // Не найден запрашиваемый ресурс
    if (error.name === 'DocumentNotFoundError') {
      errorStatus = 404;
    }

    // Ошибки, передаваемые статусом
    if (error.statusCode) {
      errorStatus = error.statusCode;
    }

    // Отправляем ошибку
    response.status(errorStatus).send({ message: ERRORS[errorStatus] });
  } else if (dataObject && !error) {
    const { ...data } = dataObject;
    // Ошибок нет, отправляем данные
    response.status(200).send({ ...data });
  }
};

module.exports = {
  responseHelper,
};
