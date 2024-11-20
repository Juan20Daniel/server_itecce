const express = require('express');
const router = express.Router();
const passport = require('passport');
const upload = require('../utils/upload');
const { verifyData } = require('../validations/verifyData');
const {
    insertStudents,
    insertStudent,
} = require('../controllers/students');
const {
    verifyFile,
} = require('../validations/verifyFile');

router.post('/', passport.authenticate('jwt', {session:false}), upload.single('excel'), verifyFile, insertStudents);
router.post('/insert-person', passport.authenticate('jwt', {session:false}), verifyData, insertStudent);

module.exports = router;