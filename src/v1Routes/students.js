const express = require('express');
const router = express.Router();
const { insert } = require('../controllers/students');
const passport = require('passport');
const upload = require('../utils/upload');
const { verifyFile } = require('../validations/verifyFile');
router.post('/', passport.authenticate('jwt', {session:false}), upload.single('excel'), verifyFile, insert);

module.exports = router;