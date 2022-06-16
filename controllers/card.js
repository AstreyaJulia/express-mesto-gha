const Card = require('../models/card');
const { errorHandler } = require('../utils/errorHandler');

/** Получить все карточки
 * @param req - запрос, /cards, метод GET
 * @param res - ответ
 * @returns {*|Promise<any>}
 */
const getCards = (req, res) => Card.find({})
  // статус 200, отправляем карточки
  .then((cards) => res.status(200).send({ data: cards }))
  // ошибка сервера, статус 500
  .catch(() => errorHandler({ statusCode: 500 }, res));

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
    .then((card) => res.status(201).send({ data: card }))
    .catch((error) => {
      errorHandler(error, res);
    });
};

/** Удаляет карточку
 * @param req - запрос, /cards/:cardId,
 * params.cardId - ID карточки, метод DELETE
 * @param res - ответ
 */
const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .orFail()
    .then((card) => { if (card) { res.status(200).send({ data: card }); } })
    .catch((error) => errorHandler(error, res)); // ошибка сервера, статус 500
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

  // добавить _id пользователя в массив лайков, если его там нет
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: _id } }, { new: true })
    .orFail()
    .then((card) => { if (card) { res.status(200).send({ data: card }); } })
    .catch((error) => errorHandler(error, res));
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

  // Удалить ID пользователя из массива лайков
  Card.findByIdAndUpdate(cardId, { $pull: { likes: _id } }, { new: true })
    .orFail()
    .then((card) => { if (card) { res.status(200).send({ data: card }); } })
    .catch((error) => errorHandler(error, res));
};

module.exports = {
  getCards, createCard, deleteCard, setCardLike, deleteCardLike,
};
