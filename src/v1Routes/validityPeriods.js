const express = require('express');
const router = express.Router();
const passport = require('passport');
const { getValidityPeriods, updateValidityPeriods } = require('../controllers/validityPeriods');

router.get('/', passport.authenticate('jwt', {session:false}), getValidityPeriods);
router.put('/', passport.authenticate('jwt', {session:false}), updateValidityPeriods);

module.exports = router;