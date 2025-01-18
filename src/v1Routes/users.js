const express = require('express');
const router = express.Router();
const passport = require('passport');
const { updateAll } = require('../controllers/users');
const { checkField } = require('../validations/checkFields');
router.patch('/', 
    passport.authenticate('jwt', {session:false}), 
    checkField('email', 'El email, no es válido.', false),
    checkField('username', 'El usuario, no es válido.', false),
    checkField('password', 'La contraseña, no es válida.', false), 
    updateAll
);

module.exports = router;