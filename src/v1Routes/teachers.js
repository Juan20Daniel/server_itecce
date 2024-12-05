const express = require('express');
const router = express.Router();
const passport = require('passport');
const upload = require('../utils/upload');
const { insert, insertTeacher } = require('../controllers/teachers');
const { verifyExcel } = require('../validations/excel');
const { verifyData } = require('../validations/data');

router.post('/', passport.authenticate('jwt', {session:false}), upload.single('excel'), verifyExcel, insert);
router.post('/insert-person', passport.authenticate('jwt', {session:false}), verifyData, insertTeacher);

module.exports = router;