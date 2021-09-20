const jwt = require('jsonwebtoken');
const TokenService = require('../services/tokenService.js');
const ErrorHandler = require('../utils/ErrorHandler.js');

const authMiddleware = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return next(ErrorHandler.UnauthorizedError());
    }

    const userData = TokenService.validateAccessToken(token);

    if (!userData) {
      return next(ErrorHandler.UnauthorizedError());
    }

    req.user = userData;
    next();
  } catch (e) {
    return next(ErrorHandler.UnauthorizedError());
  }
};

module.exports = authMiddleware;
