const express = require('express');
const router = express.Router();

const controller = require('../controllers/unmarried');


router.get('/', controller.getAll);

router.get('/:id', controller.getById);

router.post('/', controller.addNew);

router.patch('/:tierId', controller.editById);

module.exports = router;