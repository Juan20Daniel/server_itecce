const express = require('express');
const router = express.Router();
const passport = require('passport');
const { getCareers, updateAbridging } = require('../controllers/careers');
const { checkField } = require('../validations/checkFields');

router.get('/', passport.authenticate('jwt', {session:false}), getCareers);
router.patch('/', 
    passport.authenticate('jwt', {session:false}),
    checkField('id', 'El id, no es válido.'),
    checkField('abridging', 'La abreviatura, no es válida.'),
    updateAbridging
);

module.exports = router;