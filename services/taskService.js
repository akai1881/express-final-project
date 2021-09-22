const { Task, User, Lesson } = require('../models');
const ErrorHandler = require('../utils/ErrorHandler');

class TaskService {
  static getOne = async (id) => {
    const task = await Task.findOne({ where: { id } });
    if (!task) throw ErrorHandler.BadRequest('Task not found');
    return task;
  };

  static getAll = async (lessonId) => {
    const tasks = await Task.findAll({ where: { lessonId } });
    return tasks;
  };

  static create = async ({ lessonId, title, mark, completed, deadline, description, type }) => {
    return await Task.create({ lessonId, title, mark, completed, deadline, description, type });
  };

  static update = async ({ completed, id, lessonId }) => {
    return await Task.update({ completed, id }, { where: { lessonId } });
  };
}

module.exports = TaskService;
