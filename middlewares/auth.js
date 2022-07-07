const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { JWT_SECRET } = require('../utils/secretKey');

module.exports = (req, res, next) => {
  if (!req.cookies) {
    next(new UnauthorizedError('Пройдите авторизацию'));
  }
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    next(new UnauthorizedError('Пройдите авторизацию'));
  }

  req.user = payload; // занесем пейлоуд в объект запроса
  next();
};
