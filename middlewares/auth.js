const { verify } = require('jsonwebtoken');
const {
  SECRET_KEY,
  STATUS,
} = require('../utils/constants');
const AuthError = require('../error/auth-error');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  /** Если заголовок authorization не передан или не начинается с 'Bearer ' */
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthError(STATUS.AUTH_REQUIRED));
  }

  /** Удаляем 'Bearer ' из заголовка */
  const token = authorization.replace('Bearer ', '');
  let payload;

  /** Верификация токена по секретному ключу */
  try {
    payload = verify(token, SECRET_KEY);
  } catch (error) {
    return next(new AuthError(STATUS.AUTH_REQUIRED));
  }

  req.user = payload;
  return next();
};

module.exports = {
  auth,
};
