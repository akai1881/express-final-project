const express = require('express');
const router = express();

const lessonRoutes = require('./lessonRoutes.js');
const userRoutes = require('./userRoutes.js');
const profileRoutes = require('./profileRoutes.js');
const taskRoutes = require('./taskRoutes.js');
const schoolRoutes = require('./schoolRoutes.js');
const authRoutes = require('./authRoutes.js');

router.use('/task', taskRoutes);
router.use('/user', userRoutes);
router.use('/profile', profileRoutes);
router.use('/', authRoutes);
router.use('/lesson', lessonRoutes);
router.use('/school', schoolRoutes);

module.exports = router;
