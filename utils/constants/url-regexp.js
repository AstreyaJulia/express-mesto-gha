/** Рег. выражение для валидации URL-адресов
 * @type {RegExp}
 */
// eslint-disable-next-line no-useless-escape
const URL_REG_EXP = /^https?:\/\/(www\.)?[\w\-_~:\/#\[\]@!&',;=]+\.[\w\-_~:\/#\[\]@!&',;=а-я]+#?/i;

module.exports = {
  URL_REG_EXP,
};
