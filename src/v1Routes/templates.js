const express = require('express');
const passport = require('passport');
const router = express.Router();
const upload = require('../utils/upload');
const { getTamplates, updateTamplete } = require('../controllers/templates');
const { verifyImg } = require('../validations/image');

router.get('/', passport.authenticate('jwt', {session:false}), getTamplates);
router.put('/', passport.authenticate('jwt', {session:false}), upload.single('image'), verifyImg, updateTamplete);

module.exports = router;