const express = require('express');
const router = express.Router();
const passport = require('passport');
const upload = require('../utils/upload');
const { verifyData } = require('../validations/data');
const {
    insertStudents,
    insertStudent,
} = require('../controllers/students');
const {
    verifyExcel,
} = require('../validations/excel');

router.post('/', passport.authenticate('jwt', {session:false}), upload.single('excel'), verifyExcel, insertStudents);
router.post('/insert-person', passport.authenticate('jwt', {session:false}), verifyData, insertStudent);

module.exports = router;