const express = require('express');
const router = express.Router();
const passport = require('passport');
const { getLastClients } = require('../controllers/clients');

router.get('/', passport.authenticate('jwt', {session:false}), getLastClients);

module.exports = router;