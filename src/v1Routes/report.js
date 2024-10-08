const express = require('express');
const router = express.Router();
const passport = require('passport');
const { GetData } = require('../controllers/report');

router.get('/:section', passport.authenticate('jwt', {session:false}), GetData);

module.exports = router;