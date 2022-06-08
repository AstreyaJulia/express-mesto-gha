const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  setCardLike,
  deleteCardLike,
} = require('../controllers/card');

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCard);
router.put('/cards/:cardId/likes', setCardLike);
router.delete('/cards/:cardId/likes', deleteCardLike);

module.exports = router;
