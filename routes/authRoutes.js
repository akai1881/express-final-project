const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const UserController = require('../controllers/userController');

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 25 }),
  UserController.registration
);

router.post('/login', UserController.login);
router.get('/activate/:link', UserController.activate);
router.get('/refresh', UserController.refresh);

module.exports = router;
