const SchoolService = require('../services/schoolService.js');

class SchoolController {
  static getAll = async (req, res, next) => {
    try {
      let { page, limit, q } = req.query;
      page = page || 1;
      limit = limit || 5;
      const offset = page * limit - limit;

      const schools = await SchoolService.getAll(offset, limit, q);

      return res.json(schools);
    } catch (error) {
      next(error);
    }
  };

  static create = async (req, res, next) => {
    try {
      const { name, address } = req.body;

      await SchoolService.create(name, address);

      return res.json({ message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  static delete = async (req, res, next) => {
    try {
      const { id } = req.params;

      await SchoolService.delete(id);

      return res.json({ message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = SchoolController;
