const express = require('express');
const SchoolController = require('../controllers/schoolController');

const router = express.Router();

router.get('/', SchoolController.getAll);
router.get('/:id');
router.post('/', SchoolController.create);
router.delete('/:id');
router.patch('/:id');

module.exports = router;
