const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validationMiddleware = require('../middleware/validation');

router.post('/register', validationMiddleware.validateRegisterInput, userController.register);

module.exports = router;
