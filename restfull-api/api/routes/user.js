const express = require('express');
const router = express.Router();

const controller = require('../controllers/user');

router.post('/signup', controller.newUser);

router.post('/login', controller.login);


module.exports = router;