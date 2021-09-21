const express = require('express');
const ProfileController = require('../controllers/profileController');

const router = express.Router();

router.post('/', ProfileController.create);
router.patch('/:id', ProfileController.update);

module.exports = router;
