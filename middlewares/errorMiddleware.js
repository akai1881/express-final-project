const ErrorHandler = require('./../utils/ErrorHandler.js');

module.exports = (err, req, res, next) => {
  if (err instanceof ErrorHandler) {
    return res.status(err.status).json({ message: err.message, errors: err.errors });
  }

  return res.status(500).json({ message: 'Internal server error, try again later' });
};
