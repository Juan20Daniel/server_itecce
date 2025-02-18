const express = require('express');
const router = express.Router();
const passport = require('passport');
const { getCareers, updateCareer } = require('../controllers/careers');
const { checkField } = require('../validations/checkFields');

router.get('/', passport.authenticate('jwt', {session:false}), getCareers);
router.patch('/', 
    passport.authenticate('jwt', {session:false}),
    checkField('id', 'El id, no es válido.'),
    checkField('abridging', 'La abreviatura de la carrera, no es válida.'),
    checkField('duration', 'La duración de la carrera, no es válido.'),
    updateCareer
);

module.exports = router;