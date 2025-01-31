const express = require('express');
const router = express.Router();
const passport = require('passport');
const { getCareers } = require('../controllers/careers');

router.get('/', passport.authenticate('jwt', {session:false}), getCareers);

module.exports = router;