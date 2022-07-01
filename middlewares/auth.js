const jwt = require('jsonwebtoken');
const { STATUS } = require('../utils/constants');

/** Проверяет наличие токена авторизации и его валидность в заголовках запроса
 * @param req - запрос
 * @param res - ответ
 * @param next
 */
const auth = (req, res, next) => {
  const { authorization } = req.headers;

  /** Если заголовок authorization не передан или не начинается с 'Bearer ' */
  if (!authorization || !authorization.startsWith('Bearer ')) {
    res.status(401).send({ message: STATUS.AUTH_REQUIRED });
  }

  /** Удаляем 'Bearer ' из заголовка */
  const token = authorization.replace('Bearer ', '');
  let payload;

  /** Верификация токена по секретному ключу */
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (error) {
    res.status(401).send({ message: STATUS.AUTH_REQUIRED });
  }

  req.user = payload;
  next();
};

module.exports = {
  auth,
};
