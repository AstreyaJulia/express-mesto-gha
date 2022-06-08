const mongoose = require('mongoose');
const User = require('../models/user');

/** Хандлер проверки ответа сервера при работе с пользователями
 * @param user - пользователь
 * @param res - ответ сервера
 */
const userResponseHandler = (user, res) => {
  console.log(user)
  console.log(res)
  user
    ? res.status(200).send({ data: user }) // ID пользователя есть в БД, статус 200, отправить пользователя
    : res.status(404).send({ message: 'Пользователь с переданным ID не найден' }); // ID пользователя нет в БД, статус 404
};

/** Хандлер проверки ошибки сервера
 * @param err - ошибка, возвращенная сревером
 * @param res - ответ сервера
 */
const serverErrorHandler = (err, res) => {
  err.name === 'CastError' || err.name === 'ValidationError'
    ? res.status(400).send({ message: `Возникла ошибка ${err.message}` })
    : res.status(500).send({ message: `Возникла ошибка ${err.message}` });
};

/** Получить всех пользователей
 * @param req - запрос, /users, метод GET
 * @param res - ответ
 */
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => res.status(500).send({ data: err.message }));
};

/** Получить информацию о пользователе
 * @param req - запрос, /users/me, метод GET
 * @param res - ответ
 */
const getCurrentUser = (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.userId)) {
    User.findById(req.user._id)
      .then((user) => userResponseHandler(user, res))
      .catch((err) => {
        res.status(500).send({ data: err.message });
      });
  } else {
    res.status(400).send({ message: 'Введен некорректный id' });
  }
};

/** Получить пользователя по ID
 * @param req - /users/:userId, params.userId - ID пользователя, метод GET
 * @param res - ответ
 */
const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => userResponseHandler(user, res))
    .catch((err) => serverErrorHandler(err, res));
};

/** Создать пользователя
 * @param req - запрос, /users, метод POST
 * @param res - ответ
 */
const createUser = (req, res) => {
  const {
    name, about, avatar,
  } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => serverErrorHandler(err, res));
};

/** Изменить информацию о пользователе
 * @param req - запрос, /users/me, user._id - ID пользователя, body - тело: { name - имя, about - подпись }, метод PATCH
 * @param res - ответ
 */
const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => userResponseHandler(user, res))
    .catch((err) => serverErrorHandler(err, res));
};

/** Изменить аватар пользователя
 * @param req - запрос, /users/me/avatar, body: { avatar - ссылка на аватар }, user._id - ID пользователя, метод PATCH
 * @param res - ответ
 */
const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => userResponseHandler(user, res))
    .catch((err) => serverErrorHandler(err, res));
};

module.exports = {
  getUsers,
  getUserById,
  getCurrentUser,
  createUser,
  updateProfile,
  updateAvatar,
};
