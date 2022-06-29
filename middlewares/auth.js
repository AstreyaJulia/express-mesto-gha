const { STATUS } = require('../utils/constants');
const { checkToken } = require('../utils/jwt');

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
    payload = checkToken(token);
  } catch (error) {
    res.status(401).send({ message: STATUS.AUTH_REQUIRED });
  }

  req.user = payload;
  return next();
};

module.exports = {
  auth,
};
