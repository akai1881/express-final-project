const TaskService = require('../services/taskService');

class TaskController {
  static getOne = async (req, res, next) => {
    try {
      const { id } = req.params;

      const task = await TaskService.getOne(id);

      return res.json(task);
    } catch (error) {
      next(error);
    }
  };

  static getAll = async (req, res, next) => {
    try {
      const { lesson } = req.query;

      const tasks = await TaskService.getAll(lesson);

      return res.json(tasks);
    } catch (error) {
      next(error);
    }
  };

  static create = async (req, res, next) => {
    try {
      const { lessonId, title, mark, completed, deadline, description, type } = req.body;

      await TaskService.create({ lessonId, title, mark, completed, deadline, description, type });

      return res.json({ message: 'task created' });
    } catch (error) {
      next(error);
    }
  };

  static update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { lessonId, completed } = req.body;

      await TaskService.update({ lessonId, completed, id });

      return res.json({ message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = TaskController;
