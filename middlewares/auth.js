/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */

const jwt = require('jsonwebtoken');

function auth(req, res, next) {
// достаём авторизационный заголовок
  const { authorization } = req.headers;
  // проверяем, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходимо авторизоваться' });
  }
  // извлекаем токен
  const token = authorization.replace('Bearer ', '');
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
}
module.exports = { auth };
