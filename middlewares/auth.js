const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/UnauthorizedError');
const { JWT_SECRET } = require('../utils/secretKey');

const auth = (req, res, next) => {
  if (!req.cookies.jwt) {
    next(new UnauthorizedError('Необходимо авторизироваться.'));
  } else {
    const token = req.cookies.jwt;
    let payload;

    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      next(new UnauthorizedError('JWT авторизация прошла неудачно.'));
    }

    req.user = payload;

    next();
  }
};

module.exports = auth;
