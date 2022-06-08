/** Обработчик ответа
 * @param data - данные, или null
 * @param error - ошибка от сервера, либо {status: номер статуса}, либо null, если нет ошибки
 * @param response - ответ
 */
const responseHelper = (data, error, response) => {
  /** Объект для ошибок
   * @type Object
   */
  const ERRORS = {
    400: { status: 400, text: 'Переданы некоректные данные' },
    404: { status: 404, text: 'Запрашиваемый ресурс не найден' },
    500: { status: 500, text: 'Ошибка сервера' },
  };

  // Если получили ошибку
  if (error) {
    // Ошибка на тот случай, если ни одно условие не подойдет
    let errorStatus = 500;

    // Ошибки валидации: не заполнено, не тот тип, и т.д.
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      errorStatus = 400;
    }

    // Ошибки, передаваемые статусом
    if (error.status) {
      errorStatus = error.status;
    }

    // Отправляем ошибку
    response.status(errorStatus).send({ message: ERRORS[errorStatus].text });
  } else if (data && !error) {
    // Ошибок нет, отправляем данные
    response.status(200).send({ ...data });
  }
};

module.exports = {
  responseHelper,
};
