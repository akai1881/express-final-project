const { Lesson, Lesson_user } = require('../models');
const ErrorHandler = require('../utils/ErrorHandler');

class LessonService {
  static getAll = async () => {
    return await Lesson.findAll();
  };

  static getOne = async (id) => {
    const lesson = await Lesson.findOne({ where: { id } });
    if (!lesson) throw ErrorHandler.BadRequest('Lesson not found');
    return lesson;
  };

  static create = async ({ name, hours }) => {
    return await Lesson.create({ name, hours });
  };

  // static update = async ({ name, hours, studentId, id }) => {
  //   return await Lesson.update({ teacherId }, { where });
  // };

  static addStudent = async ({ userId, id }) => {
    return await Lesson_user.create({ userId, lessonId: id });
  };
}

module.exports = LessonService;
