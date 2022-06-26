const User = require('../models/user');
const { errorHandler } = require('../utils/errorHandler');
const { sign } = require('jsonwebtoken');
const { SECRET_KEY } = require('../utils/constants');

/** Получить всех пользователей
 * @param req - запрос, /users, метод GET
 * @param res - ответ
 */
const getUsers = (req, res) => User.find({})
  .then((users) => res.send({ data: users }))
  .catch((error) => errorHandler(error, res));

/** Получить информацию о пользователе
 * @param req - запрос, /users/me, метод GET
 * @param res - ответ
 */
const getUserInfo = (req, res) => {
  const { _id } = req.user;

  User.findById(_id)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((error) => errorHandler(error, res));
};

/** Получить пользователя по ID
 * @param req - /users/:userId, params.userId - ID пользователя, метод GET
 * @param res - ответ
 */
const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((error) => errorHandler(error, res));
};

/** Создать пользователя
 * @param req - запрос, /users, метод POST
 * @param res - ответ
 */
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((error) => errorHandler(error, res));
};

/** Изменить информацию о пользователе
 * @param req - запрос, /users/me,
 * user._id - ID пользователя,
 * body - тело: { name - имя, about - подпись }, метод PATCH
 * @param res - ответ
 */
const updateProfile = (req, res) => {
  const { name, about } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((error) => errorHandler(error, res));
};

/** Изменить аватар пользователя
 * @param req - запрос, /users/me/avatar,
 * body: { avatar - ссылка на аватар },
 * user._id - ID пользователя, метод PATCH
 * @param res - ответ
 */
const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((error) => errorHandler(error, res));
};

const login = (req, res) => {
  const { email, password } = req.body;
  User['statics'].findUserByCredentials(email, password, res)
    .then((user) => {
      const token = sign({ _id: user._id }, SECRET_KEY, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
      res.status(201).send({ message: 'Авторизация успешна', token });
    })
    .catch((error) => errorHandler(error, res));
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
