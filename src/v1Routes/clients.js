const express = require('express');
const router = express.Router();
const passport = require('passport');
const { removeClientsByType, removeAllClients } = require('../controllers/clients');
const { checkField } = require('../validations/checkFields');

router.delete('/', 
    passport.authenticate('jwt', {session:false}),
    removeAllClients
);
router.delete('/:type', 
    passport.authenticate('jwt', {session:false}),
    checkField('type', 'El tipo, no es válida.'),
    removeClientsByType
);

module.exports = router;