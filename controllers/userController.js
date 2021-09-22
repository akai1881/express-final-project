const { validationResult } = require('express-validator');
const UserService = require('../services/userService.js');
const ErrorHandler = require('./../utils/ErrorHandler.js');

class UserController {
  static registration = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ErrorHandler.BadRequest('Ошибка при валидации', errors.array()));
      }

      const { email, password, role } = req.body;

      const userData = await UserService.registration(email, password, role);

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  };

  static login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const userData = await UserService.login(email, password);
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  };

  static activate = async (req, res, next) => {
    try {
      const { link } = req.params;
      await UserService.activate(link);
      return res.redirect(`https://www.google.com`);
    } catch (error) {
      next(error);
    }
  };

  static refresh = async (req, res, next) => {
    try {
      const { refresh_token } = req.headers;
      const userData = await UserService.refresh(refresh_token);
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  };

  static getAll = async (req, res, next) => {
    try {
      const { school } = req.query;
      const users = await UserService.getAll(school);
      return res.json(users);
    } catch (error) {
      next(error);
    }
  };

  static getOne = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { user } = req;

      // if (id != user.id || user.role !== 'teacher') {
      //   return next(ErrorHandler.ForbiddenError('Not allowed'));
      // }

      const userData = await UserService.getOne(id);

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  };

  static update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { user } = req;
      const { role, schoolId } = req.body;

      if (id != user.id || user.role !== 'teacher') {
        return next(ErrorHandler.ForbiddenError('Not allowed'));
      }

      const updateData = {
        id,
        role,
        schoolId,
      };

      await UserService.update(updateData);
      return res.json({ message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UserController;
