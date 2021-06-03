/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // извлекаем токен
  const token = req.cookies.jwt;
  // верифицируем токен
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Необходимо авторизоваться' });
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next();
};
