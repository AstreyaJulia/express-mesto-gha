const mongoose = require('mongoose');
const Card = require('../models/card');
const { responseHelper } = require('../utils/responseHelper');

/** Получить все карточки
 * @param req - запрос, /cards, метод GET
 * @param res - ответ
 * @returns {*|Promise<any>}
 */
const getCards = (req, res) => Card.find({})
  // статус 200, отправляем карточки
  .then((cards) => responseHelper({ data: cards }, null, res))
  // ошибка сервера, статус 500
  .catch(() => responseHelper(null, { statusCode: 500 }, res));

/** Создает карточку
 * @param req - запрос, /cards,
 * {name - название карточки, link - ссылка на изображение},
 * user._id - ID пользователя, метод POST
 * @param res - ответ
 * @returns {Promise<*>}
 */
const createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  return Card.create({ name, link, owner: _id })
    .then((card) => responseHelper({ data: card }, null, res))
    .catch((err) => {
      responseHelper(null, err, res);
    });
};

/** Удаляет карточку
 * @param req - запрос, /cards/:cardId,
 * params.cardId - ID карточки, метод DELETE
 * @param res - ответ
 */
const deleteCard = (req, res) => {
  const { cardId } = req.params;

  if (mongoose.Types.ObjectId.isValid(cardId)) { // валидация передаваемого ID карточки
    Card.findByIdAndRemove(cardId)
      .orFail((err) => {
        responseHelper(null, err, res);
      })
      .then((card) => { if (card) { responseHelper({ data: card }, null, res); } })
      .catch((err) => responseHelper(null, err, res)); // ошибка сервера, статус 500
  } else {
    responseHelper(null, { statusCode: 400 }, res);
  }
};

/** Ставит лайк карточке
 * @param req - запрос, /cards/:cardId/likes,
 * params.cardId - ID карточки,
 * user._id - ID пользователя, метод PUT
 * @param res - ответ
 */
const setCardLike = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  if (mongoose.Types.ObjectId.isValid(cardId)) {
    // добавить _id пользователя в массив лайков, если его там нет
    Card.findByIdAndUpdate(cardId, { $addToSet: { likes: _id } }, { new: true })
      .orFail((err) => {
        responseHelper(null, err, res);
      })
      .then((card) => { if (card) { responseHelper({ data: card }, null, res); } })
      .catch((err) => responseHelper(null, err, res));
  } else {
    responseHelper(null, { statusCode: 400 }, res);
  }
};

/** Удаляет лайк у карточки
 * @param req - запрос, /cards/:cardId/likes,
 * params.cardId - ID карточки,
 * user._id - ID пользователя, метод DELETE
 * @param res - ответ
 */
const deleteCardLike = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  if (mongoose.Types.ObjectId.isValid(cardId)) {
    // Удалить ID пользователя из массива лайков
    Card.findByIdAndUpdate(cardId, { $pull: { likes: _id } }, { new: true })
      .orFail((err) => {
        responseHelper(null, err, res);
      })
      .then((card) => { if (card) { responseHelper({ data: card }, null, res); } })
      .catch((err) => responseHelper(null, err, res));
  } else {
    responseHelper(null, { statusCode: 400 }, res);
  }
};

module.exports = {
  getCards, createCard, deleteCard, setCardLike, deleteCardLike,
};
