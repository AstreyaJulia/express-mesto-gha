const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  setCardLike,
  deleteCardLike,
} = require('../controllers/card');
const {
  createCardValidation,
  idCardValidation,
} = require('../middlewares/validation');

router.get('/', getCards);
router.post('/', createCardValidation, createCard);
router.delete('/:cardId', idCardValidation, deleteCard);
router.put('/:cardId/likes', idCardValidation, setCardLike);
router.delete('/:cardId/likes', idCardValidation, deleteCardLike);

module.exports = router;
