const express = require('express');
const router = express.Router();
const passport = require('passport');
const upload = require('../utils/upload');
const { insertStudents } = require('../controllers/students');
const { verifyExcel } = require('../validations/excel');

router.post('/', passport.authenticate('jwt', {session:false}), upload.single('excel'), verifyExcel, insertStudents);

module.exports = router;