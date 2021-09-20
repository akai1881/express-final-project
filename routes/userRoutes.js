const express = require('express');
const UserController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', UserController.getAll);
router.get('/:id', UserController.getOne);
router.patch('/:id', UserController.update);

module.exports = router;
