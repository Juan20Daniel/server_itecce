const express = require('express');
const router = express.Router();
const passport = require('passport');
const { getValidityPeriods, updateValidityPeriods } = require('../controllers/validityPeriods');
const { verifyPeriods  } = require('../validations/periods');

router.get('/', passport.authenticate('jwt', {session:false}), getValidityPeriods);
router.put('/', passport.authenticate('jwt', {session:false}), verifyPeriods, updateValidityPeriods);

module.exports = router;