const User = require("../models/user");

function getUrers(req, res) {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
}

function getUserById(req, res) {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
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

module.exports = {
  getUrers,
  getUserById,
  createUser,
};
