const express = require('express');
const router = express.Router();
const passport = require('passport');
const upload = require('../utils/upload');
const { verifyData } = require('../validations/verifyData');
const {
    getAll,
    getById,
    getByFullname,
    getInfoScrool,
    getNumTotal,
    insertStudents,
    insertStudent,
    remove
} = require('../controllers/students');
const {
    verifyFile,
    verifyId,
    verifyFullname,
    verifyOffset,
} = require('../validations/verifyFile');

router.get('/', passport.authenticate('jwt', {session:false}), verifyOffset, getAll);
router.get('/search-by-id/:id', passport.authenticate('jwt', {session:false}), verifyId, verifyOffset, getById);
router.get('/search-by-name/:fullname', passport.authenticate('jwt', {session:false}), verifyFullname, verifyOffset, getByFullname);
router.get('/get-info-school/:id', passport.authenticate('jwt', {session:false}), verifyId, getInfoScrool);
router.get('/get-num-total', passport.authenticate('jwt', {session:false}), getNumTotal);
router.post('/', passport.authenticate('jwt', {session:false}), upload.single('excel'), verifyFile, insertStudents);
router.post('/insert-person', passport.authenticate('jwt', {session:false}), verifyData, insertStudent);
router.delete('/:id', passport.authenticate('jwt', {session:false}), remove);

module.exports = router;