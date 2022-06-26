const { verify } = require('jsonwebtoken');
const { errorHandler } = require('../utils/errorHandler');
const { SECRET_KEY } = require('../utils/constants');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  /** Если заголовок authorization не передан или не начинается с 'Bearer ' */
  if (!authorization || !authorization.startsWith('Bearer ')) {
    errorHandler({ statusCode: 401 }, res);
  }

  /** Удаляем 'Bearer ' из заголовка */
  const token = authorization.replace('Bearer ', '');
  let payload;

  /** Верификация токена по секретному ключу */
  try {
    payload = verify(token, SECRET_KEY);
  } catch (error) {
    errorHandler(error, res);
  }

  req.user = payload;
  next();
};

module.exports = {
  auth,
};
