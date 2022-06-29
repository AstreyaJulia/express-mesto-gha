const { sign } = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { SECRET_KEY } = require('../utils/constants');
const NotFoundError = require('../error/not-found-error');
const { STATUS } = require('../utils/constants');
const EmailExistError = require('../error/email-exist-error');
const BadRequestError = require('../error/bad-request-error');
const AuthError = require('../error/auth-error');

/** Получить всех пользователей
 * @param req - запрос, /users, метод GET
 * @param res - ответ
 * @param next
 */
const getUsers = (req, res, next) => User.find({})
  .then((users) => res.send({ data: users }))
  .catch(next);

/** Получить информацию о пользователе
 * @param req - запрос, /users/me, метод GET
 * @param res - ответ
 * @param next
 */
const getUserInfo = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .then((user) => res.send({ data: user }))
    .catch(next);
};

/** Получить пользователя по ID
 * @param req - /users/:userId, params.userId - ID пользователя, метод GET
 * @param res - ответ
 */
const getUserById = (req, res) => new Promise((resolve, reject) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        reject(new NotFoundError(STATUS.USER_NOT_FOUND));
      }
      return res.send({ data: user });
    })
    .catch((error) => reject(error));
});

/** Создать пользователя
 * @param req - запрос, /users, метод POST
 * @param res - ответ
 * @param next
 */
const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(201)
      .send({
        data: {
          _id: user._id,
          name,
          about,
          avatar,
          email,
        },
      }))
    .catch((error) => {
      if (error.code === 11000) {
        return next(new EmailExistError(STATUS.EMAIL_EXIST));
      }
      if (error.name === 'ValidationError') {
        return next(new BadRequestError(STATUS.CREATE_USER_VALIDATION));
      }
      return next(error);
    });
};

/** Изменить информацию о пользователе
 * @param req - запрос, /users/me,
 * user._id - ID пользователя,
 * body - тело: { name - имя, about - подпись }, метод PATCH
 * @param res - ответ
 * @param next
 */
const updateProfile = (req, res, next) => {
  const {
    name,
    about,
  } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, {
    name,
    about,
  }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) throw new NotFoundError(STATUS.USER_NOT_FOUND);
      return res.send({ data: user });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') return next(new BadRequestError(STATUS.UPDATE_PROFILE_VALIDATION));
      return next(error);
    });
};

/** Изменить аватар пользователя
 * @param req - запрос, /users/me/avatar,
 * body: { avatar - ссылка на аватар },
 * user._id - ID пользователя, метод PATCH
 * @param res - ответ
 * @param next
 */
const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) throw new NotFoundError(STATUS.USER_NOT_FOUND);
      return res.send({ data: user });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') return next(new BadRequestError(STATUS.UPDATE_AVATAR_VALIDATION));
      return next(error);
    });
};

/** Вход в систему
 * @param req - запрос
 * @param res
 * @param next
 */
const login = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;
  User.findUserByCredentials(email, password, res)
    .then((user) => {
      const token = sign({ _id: user._id }, SECRET_KEY, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
      res.status(201)
        .send({ token });
    })
    .catch(() => next(new AuthError(STATUS.AUTH_FAIL)));
};

module.exports = {
  getUsers,
  getUserById,
  getUserInfo,
  createUser,
  updateProfile,
  updateAvatar,
  login,
};
