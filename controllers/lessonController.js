const LessonService = require('../services/lessonService');

class LessonController {
  static getAll = async (req, res, next) => {
    try {
      const lessons = await LessonService.getAll();

      return res.json(lessons);
    } catch (error) {
      next(error);
    }
  };

  static getOne = async (req, res, next) => {
    try {
      const { id } = req.params;

      const lesson = await LessonService.getOne(id);

      return res.json(lesson);
    } catch (error) {
      next(error);
    }
  };

  static create = async (req, res, next) => {
    try {
      const { name, hours } = req.body;
      await LessonService.create({ name, hours });

      return res.json({ message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  static addStudent = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      await LessonService.addStudent({ id, userId });
      return res.json({ message: 'add' });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = LessonController;
