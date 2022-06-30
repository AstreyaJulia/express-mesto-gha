const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  setCardLike,
  deleteCardLike,
} = require('../controllers/card');
const {
  idValidation,
  createCardValidation,
} = require('../middlewares/validation');

router.get('/', getCards);
router.post('/', createCardValidation, createCard);
router.delete('/:cardId', idValidation, deleteCard);
router.put('/:cardId/likes', idValidation, setCardLike);
router.delete('/:cardId/likes', idValidation, deleteCardLike);

module.exports = router;
