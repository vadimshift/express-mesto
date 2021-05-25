const router = require('express').Router();
const {
  createCard, getCards, delCard, setLikeCard, setDislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', delCard);
router.put('/cards/:cardId/likes', setLikeCard);
router.delete('/cards/:cardId/likes', setDislikeCard);

module.exports = router;
