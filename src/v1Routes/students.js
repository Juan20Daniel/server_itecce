const express = require('express');
const router = express.Router();
const passport = require('passport');
const upload = require('../utils/upload');
const { verifyData } = require('../validations/verifyData');
const {
    getAll,
    getInfoScrool,
    getNumTotal,
    insertStudents,
    insertStudent,
    remove
} = require('../controllers/students');
const {
    verifyFile,
    verifyId,
    verifyOffset,
} = require('../validations/verifyFile');

router.get('/', passport.authenticate('jwt', {session:false}), verifyOffset, getAll);
router.get('/info-school/:id', passport.authenticate('jwt', {session:false}), verifyId, getInfoScrool);
router.get('/num-total', passport.authenticate('jwt', {session:false}), getNumTotal);
router.post('/', passport.authenticate('jwt', {session:false}), upload.single('excel'), verifyFile, insertStudents);
router.post('/insert-person', passport.authenticate('jwt', {session:false}), verifyData, insertStudent);
router.delete('/:id', passport.authenticate('jwt', {session:false}), remove);

module.exports = router;