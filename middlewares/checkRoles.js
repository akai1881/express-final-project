const ErrorHandler = require('../utils/ErrorHandler');

const checkRole = (...roles) => {
  return (req, res, next) => {
    if (req.method === 'OPTIONS') {
      next();
    }

    try {
      const { user } = req;
      console.log(user);
      if (!roles.includes(user.role)) {
        return next(ErrorHandler.ForbiddenError('У вас нет доступа'));
      }

      next();
    } catch (e) {
      return next(ErrorHandler.UnauthorizedError());
    }
  };
};

module.exports = checkRole;
