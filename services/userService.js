const { User } = require('./../models/index.js');
const bcrypt = require('bcrypt');
const ErrorHandler = require('../utils/ErrorHandler.js');
const TokenService = require('./tokenService.js');

class UserService {
  static registration = async (email, password, role) => {
    const oldUser = await User.findOne({ where: { email } });
    if (oldUser) {
      throw ErrorHandler.BadRequest('Пользователь с таким email уже существует');
    }

    const hashedPassword = await bcrypt.hash(password, 3);

    const user = await User.create({ email, password: hashedPassword, role });
    const tokens = TokenService.generateTokens({ id: user.id, email, role });
    return {
      ...tokens,
      user: {
        email,
        id: user.id,
        role,
      },
    };
  };

  static login = async (email, password) => {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw ErrorHandler.BadRequest('Wrong email or password');
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      throw ErrorHandler.BadRequest('Wrong email or password');
    }

    const tokens = TokenService.generateTokens({ id: user.id, email, role: user.role });
    return {
      ...tokens,
      user: {
        email,
        id: user.id,
        role: user.role,
      },
    };
  };

  static refresh = async (token) => {
    if (!token) {
      throw ErrorHandler.UnauthorizedError();
    }

    const userData = TokenService.validateRefreshToken(token);

    if (!userData) {
      throw ErrorHandler.UnauthorizedError();
    }

    const user = await User.findOne({ where: { id: userData.id } });

    if (!user) {
      throw ErrorHandler.BadRequest('User not found');
    }

    const tokens = TokenService.generateTokens({ id: user.id, email: user.email, role: user.role });

    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  };

  static getAll = async (school) => {
    let users;
    if (school) {
      users = await User.findAll({ where: { schoolId: school }, attributes: ['email', 'role', 'id'] });
      return users;
    }

    return await User.findAll({ attributes: ['email', 'role', 'id'] });
  };

  static getOne = async (id) => {
    const user = await User.findOne({ where: { id } });

    if (!user) throw ErrorHandler.BadRequest('User not found');

    return user;
  };

  static update = async ({ id, role, schoolId }) => {
    const user = await User.findOne({ where: { id } });

    if (!user) {
      throw ErrorHandler.BadRequest('User not found');
    }

    role = role || user.role;
    schoolId = schoolId || user.schoolId;

    await User.update({ role, schoolId }, { where: { id } });
  };
}

module.exports = UserService;
