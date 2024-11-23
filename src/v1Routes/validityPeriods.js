const express = require('express');
const router = express.Router();
const passport = require('passport');
const { getValidityPeriods } = require('../controllers/validityPeriods');

router.get('/', passport.authenticate('jwt', {session:false}), getValidityPeriods);

module.exports = router;