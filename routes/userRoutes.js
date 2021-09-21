const express = require('express');
const UserController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRoles');

const router = express.Router();

router.get('/', UserController.getAll);
router.get('/:id', UserController.getOne);
router.patch('/:id', checkRole('teacher', 'student'), UserController.update);

module.exports = router;
