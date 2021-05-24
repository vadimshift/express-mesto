const Card = require("../models/card");

function createCard(req, res) {
  const { name, link, owner, likes, createdAt } = req.body;
  Card.create({ name, link, owner: req.user._id, likes, createdAt })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({
          message: `${Object.values(err.errors)
            .map((e) => e.message)
            .join(", ")}`,
        });
      } else {
        res.status(500).send({ message: "Произошла ошибка" });
      }
    });
}

function getCards(req, res) {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
}

function delCard(req, res) {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
}

module.exports = {
  createCard,
  getCards,
  delCard,
};
