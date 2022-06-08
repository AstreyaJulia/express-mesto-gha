const mongoose = require('mongoose');
const Card = require('../models/card');

/** Хандлер проверки ответа сервера при работе с карточками
 * @param card - карточка
 * @param res - ответ сервера
 */
const cardResponseHandler = (card, res) => {
  card
    // ID карточки есть в БД, статус 200, отправить карточку
    ? res.status(200).send({ data: card })
    // ID карточки нет в БД, статус 404
    : res.status(404).send({ message: 'Карточка с переданным ID не найдена' });
};

/** Получить все карточки
 * @param req - запрос, /cards, метод GET
 * @param res - ответ
 * @returns {*|Promise<any>}
 */
const getCards = (req, res) => Card.find({})
  .then((cards) => res.status(200).send({ data: cards })) // статус 200, отправляем карточки
  .catch((err) => res.status(500).send({ data: err.message })); // ошибка сервера, статус 500

/** Создает карточку
 * @param req - запрос, /cards,
 * {name - название карточки, link - ссылка на изображение},
 * user._id - ID пользователя, метод POST
 * @param res - ответ
 * @returns {Promise<*>}
 */
const createCard = (req, res) => {
  const { name, link } = req.body;
  const ownerID = req.user._id;

  return Card.create({ name, link, owner: ownerID })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      err.name === 'ValidationError'
        ? res.status(400).send({ message: `Возникла ошибка ${err.message}` }) // ошибка валидации
        : res.status(500).send({ message: `Возникла ошибка ${err.message}` }); // ошибка сервера
    });
};

/** Удаляет карточку
 * @param req - запрос, /cards/:cardId, params.cardId - ID карточки, метод DELETE
 * @param res - ответ
 */
const deleteCard = (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.cardId)) { // валидация передаваемого ID карточки
    Card.findByIdAndRemove(req.params.cardId)
      .then((card) => cardResponseHandler(card, res))
      .catch((err) => res.status(500).send({ data: err.message })); // ошибка сервера, статус 500
  } else {
    res.status(400).send({ message: 'Передан некорректный ID карточки.' });
  }
};

/** Ставит лайк карточке
 * @param req - запрос, /cards/:cardId/likes, params.cardId - ID карточки, user._id - ID пользователя, метод PUT
 * @param res - ответ
 */
const setCardLike = (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.cardId)) {
    // добавить _id пользователя в массив лайков, если его там нет
    Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
      .then((card) => cardResponseHandler(card, res))
      .catch((err) => res.status(500).send({ message: `Возникла ошибка ${err.message}` }));
  } else {
    res.status(400).send({ message: 'Передан некорректный ID карточки' });
  }
};

/** Удаляет лайк у карточки
 * @param req - запрос, /cards/:cardId/likes, params.cardId - ID карточки, user._id - ID пользователя, метод DELETE
 * @param res - ответ
 */
const deleteCardLike = (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.cardId)) {
    Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true }) // убрать _id из массива
      .then((card) => cardResponseHandler(card, res))
      .catch((err) => res.status(500).send({ message: `Возникла ошибка ${err.message}` }));
  } else {
    res.status(400).send({ message: 'Передан некорректный ID карточки' });
  }
};

module.exports = {
  getCards, createCard, deleteCard, setCardLike, deleteCardLike,
};
