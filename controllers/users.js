/* eslint-disable max-len */
/* eslint-disable no-bitwise */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

function getUrers(req, res) {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

function getUserById(req, res) {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.message && ~err.message.indexOf('Cast to ObjectId failed')) {
        res.status(404).send({ message: 'Пользователь по указанному _id не найден' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
}

function createUser(req, res) {
  const {
    // eslint-disable-next-line no-unused-vars
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
}

function updateProfile(req, res) {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
}

function updateAvatar(req, res) {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then(() => res.send({ avatar }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
}

function login(req, res) {
  const { email, password } = req.body;
  User.findOne({ email })
    // ищем пользователя в базе данных
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      // // сравниваем переданный пароль и хеш из базы
      return bcrypt.compare(password, user.password);
    })
    // eslint-disable-next-line consistent-return
    .then((matched) => {
      if (!matched) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      // аутентификация успешна
      // создаем токен
      const token = jwt.sign({ _id: matched._id }, 'some-secret-key', { expiresIn: '7d' });
      // возвращаем токен в куки, срок жизни 7 дней
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .end();
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
}

module.exports = {
  getUrers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  login,
};
