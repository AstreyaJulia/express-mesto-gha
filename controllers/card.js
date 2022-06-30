const Card = require('../models/card');
const { STATUS } = require('../utils/constants');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');

/** Получить все карточки
 * @param req - запрос, /cards, метод GET
 * @param res - ответ
 * @param next
 * @returns {*|Promise<any>}
 */
const getCards = (req, res, next) => Card.find({})
  .then((cards) => res.send({ data: cards }))
  .catch(next);

/** Создает карточку
 * @param req - запрос, /cards,
 * {name - название карточки, link - ссылка на изображение},
 * user._id - ID пользователя, метод POST
 * @param res - ответ
 * @param next
 * @returns {Promise<*>}
 */
const createCard = (req, res, next) => {
  const {
    name,
    link,
  } = req.body;
  const { _id } = req.user;

  return Card.create({
    name,
    link,
    owner: _id,
  })
    .then((card) => res.status(201)
      .send({ data: card }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return new BadRequestError(STATUS.CREATE_CARD_VALIDATION);
      }
      return next(error);
    });
};

/** Удаляет карточку
 * @param req - запрос, /cards/:cardId,
 * params.cardId - ID карточки, метод DELETE
 * @param res - ответ
 * @param next
 */
const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findOne({ _id: cardId }, 'owner')
    // eslint-disable-next-line
    .then((card) => {
      if (!card) return new NotFoundError(STATUS.CARD_NOT_FOUND);
      if (card.get('owner', String) !== req.user._id) {
        return new ForbiddenError(STATUS.DEL_CARD_FORBIDDEN);
      }
      Card.findOneAndDelete({ _id: cardId })
        .then(() => {
          Card.find({}, 'name link owner likes')
            .populate('owner', 'name about')
            .populate('likes', 'name about')
            .then((cards) => res.send({ data: cards }))
            .catch(next);
        })
        .catch(next);
    })
    .catch(next);
};

/** Ставит лайк карточке
 * @param req - запрос, /cards/:cardId/likes,
 * params.cardId - ID карточки,
 * user._id - ID пользователя, метод PUT
 * @param res - ответ
 * @param next
 */
const setCardLike = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  // добавить _id пользователя в массив лайков, если его там нет
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: _id } }, { new: true })
    .then((card) => {
      if (!card) return new NotFoundError(STATUS.CARD_NOT_FOUND);
      return res.send({ data: card });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return new BadRequestError(STATUS.UPDATE_CARD_VALIDATION);
      }
      return next(error);
    });
};

/** Удаляет лайк у карточки
 * @param req - запрос, /cards/:cardId/likes,
 * params.cardId - ID карточки,
 * user._id - ID пользователя, метод DELETE
 * @param res - ответ
 * @param next
 */
const deleteCardLike = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  // Удалить ID пользователя из массива лайков
  Card.findByIdAndUpdate(cardId, { $pull: { likes: _id } }, { new: true })
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return new BadRequestError(STATUS.UPDATE_CARD_VALIDATION);
      }
      return next(error);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  setCardLike,
  deleteCardLike,
};
