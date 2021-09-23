const { School } = require('./../models/index.js');
const { Op } = require('sequelize');
const ErrorHandler = require('../utils/ErrorHandler.js');

class SchoolService {
  static getAll = async (offset, limit, q) => {
    if (q) {
      return await School.findAndCountAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: q + '%',
              },
            },
            {
              address: {
                [Op.iLike]: q + '%',
              },
            },
          ],
        },
        limit,
        offset,
      });
    }

    return await School.findAndCountAll({ limit, offset });
  };

  static create = async (name, address) => {
    await School.create({ name, address });
  };

  static delete = async (id) => {
    const school = await School.findOne({ where: { id } });
    if (!school) throw ErrorHandler.BadRequest('School not found');
    return await School.destroy({ where: { id } });
  };
}

module.exports = SchoolService;
