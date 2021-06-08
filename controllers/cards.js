/* eslint-disable no-bitwise */
const Card = require('../models/card');
const { NotFoundError, BadRequestError } = require('../middlewares/errors');

function createCard(req, res, next) {
  const {
    name, link, likes, createdAt,
  } = req.body;
  Card.create({
    name, link, owner: req.user._id, likes, createdAt,
  })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные при создании карточки');
      }
    })
    .catch(next);
}

function getCards(req, res, next) {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
}
//недопилено
function delCard(req, res) {
  const currentUser = req.user._id; // id текущего пользователя
  const { cardId } = req.params;
  Card.findById(req.params.cardId, res)
    .then((res) => {
      const cardOwner = res.owner;
      const cardOw = cardOwner.toString();
      if (req.user._id === res.owner) {
        Card.findByIdAndRemove(req.params.cardId, res)
          .then((card) => res.send({ data: card }));
      }
    })
  /* if (currentUser === cardOwner) {
        //Card.findByIdAndRemove(card)
          .then((res) => console.log(res) /* res.send({ data: card }) */
  // } else { console.log('123'); }

  /*  Card.findByIdAndRemove(req.params.cardId)
    .then((res) => console.log(res))
    .then((res) => {
      console.log('123'); */

  /* if (currentUser === card.owner) {
        res.send({ message: 'ok' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      } */
    // })
  /* console.log(card) *//* res.send({ data: card }) */
    .catch((err) => {
      if (err.message && ~err.message.indexOf('Cast to ObjectId failed')) {
        res.status(404).send({ message: 'Карточка с указанным _id не найдена' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
}

function setLikeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавление _id в массив, если его там нет
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
    })
    .catch(next);
}

function setDislikeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
    })
    .catch(next);
}

module.exports = {
  createCard,
  getCards,
  delCard,
  setLikeCard,
  setDislikeCard,
};
