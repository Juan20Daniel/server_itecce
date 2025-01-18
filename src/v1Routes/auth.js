const express = require('express');
const router = express.Router();
const { login } = require('../controllers/auth');
const { checkField } = require('../validations/checkFields');

router.get('/', 
    checkField('username', 'El usuario, no es válido.'),
    checkField('password', 'El usuario, no es válido.'), 
    login
);

module.exports = router;

