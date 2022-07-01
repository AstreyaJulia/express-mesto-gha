/** E-mail уже зарегистрирован. Статус 409 */
class EmailExistError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = EmailExistError;
