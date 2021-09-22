const { User, Profile, Lesson } = require('./../models/index.js');
const bcrypt = require('bcrypt');
const ErrorHandler = require('../utils/ErrorHandler.js');
const TokenService = require('./tokenService.js');
const MailService = require('./mailService.js');
const { v4: uuidv4 } = require('uuid');

class UserService {
  static registration = async (email, password, role = 'student') => {
    const oldUser = await User.findOne({ where: { email } });

    if (oldUser) {
      throw ErrorHandler.BadRequest('Пользователь с таким email уже существует');
    }

    const hashedPassword = await bcrypt.hash(password, 3);
    const activationLink = uuidv4();
    const user = await User.create({ email, password: hashedPassword, role, activationLink });

    await MailService.sendActivation(email, `${process.env.API}/api/v1/activate/${activationLink}`);
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
    const user = await User.findOne({ where: { email }, include: { model: Profile } });

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

  static activate = async (link) => {
    const user = await User.findOne({ where: { activationLink: link } });
    if (!user) {
      throw ErrorHandler.BadRequest('Activation link is incorrect');
    }

    user.isActivated = true;
    await user.save();
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
    const user = await User.findOne({
      where: { id },
      include: [
        { model: Profile, as: 'profile' },
        { model: Lesson, as: 'lessons' },
      ],
    });

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
