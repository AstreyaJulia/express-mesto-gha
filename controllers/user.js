const User = require('../models/user');
const { responseHelper } = require('../utils/responseHelper');

/** Получить всех пользователей
 * @param req - запрос, /users, метод GET
 * @param res - ответ
 */
const getUsers = (req, res) => User.find({})
  // статус 200, отправляем пользователей
  .then((users) => responseHelper({ data: users }, { statusCode: 200 }, res))
  // ошибка сервера, статус 500
  .catch(() => responseHelper(null, { statusCode: 500 }, res));

/** Получить информацию о пользователе
 * @param req - запрос, /users/me, метод GET
 * @param res - ответ
 */
const getUserInfo = (req, res) => {
  const { _id } = req.user;

  User.findById(_id)
    .then((user) => responseHelper({ data: user }, { statusCode: 200 }, res))
    .catch((err) => {
      responseHelper(null, err, res);
    });
};

/** Получить пользователя по ID
 * @param req - /users/:userId, params.userId - ID пользователя, метод GET
 * @param res - ответ
 */
const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => { if (user) { responseHelper({ data: user }, { statusCode: 200 }, res); } })
    .catch((err) => responseHelper(null, err, res));
};

/** Создать пользователя
 * @param req - запрос, /users, метод POST
 * @param res - ответ
 */
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => responseHelper({ data: user }, { statusCode: 201 }, res))
    .catch((err) => responseHelper(null, err, res));
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
    .then((user) => { if (user) { responseHelper({ data: user }, { statusCode: 200 }, res); } })
    .catch((err) => responseHelper(null, err, res));
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
    .then((user) => { if (user) { responseHelper({ data: user }, { statusCode: 200 }, res); } })
    .catch((err) => responseHelper(null, err, res));
};

module.exports = {
  getUsers,
  getUserById,
  getUserInfo,
  createUser,
  updateProfile,
  updateAvatar,
};
