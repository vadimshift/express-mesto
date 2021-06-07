/* eslint-disable linebreak-style */
const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('./errors');

module.exports = (req, res, next) => {
  // извлекаем токен
  const token = req.cookies.jwt;
  // верифицируем токен
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    if (err.name === 'JsonWebTokenError') { throw new UnauthorizedError('Необходимо авторизоваться'); }
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next();
};
