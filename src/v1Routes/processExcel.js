const express = require('express');
const router = express.Router();
const passport = require('passport');
const upload = require('../utils/upload');
const { verifyExcel } = require('../validations/excel');
const { processExcel } = require('../controllers/processExcel');

router.post('/', passport.authenticate('jwt', {session:false}), upload.single('excel'), verifyExcel, processExcel);

module.exports = router;