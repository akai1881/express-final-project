const express = require('express');
const LessonController = require('../controllers/lessonController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', LessonController.getAll);
router.get('/:id', LessonController.getOne);
router.post('/', authMiddleware, LessonController.create);
router.delete('/:id');
router.patch('/:id', LessonController.addStudent);

module.exports = router;
