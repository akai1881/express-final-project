const { School } = require('./../models/index.js');
const { Op } = require('sequelize');

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
}

module.exports = SchoolService;
