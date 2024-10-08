const express = require('express');
const router = express.Router();
const passport = require('passport');
const upload = require('../utils/upload');
const { insert, getAll, getById, getByFullname, getNumTotal, insertTeacher, remove } = require('../controllers/teachers');
const { verifyFile, verifyId, verifyFullname, verifyOffset } = require('../validations/verifyFile');
const { verifyData } = require('../validations/verifyData');
router.get('/', passport.authenticate('jwt', {session:false}), verifyOffset, getAll);
router.get('/search-by-id/:id', passport.authenticate('jwt', {session:false}), verifyId, verifyOffset, getById);
router.get('/search-by-name/:fullname', passport.authenticate('jwt', {session:false}), verifyFullname, verifyOffset, getByFullname);
router.get('/get-num-total', passport.authenticate('jwt', {session:false}), getNumTotal);
router.post('/', passport.authenticate('jwt', {session:false}), upload.single('excel'), verifyFile, insert);
router.post('/insert-person', passport.authenticate('jwt', {session:false}), verifyData, insertTeacher);
router.delete('/:id', passport.authenticate('jwt', {session:false}), remove);

module.exports = router;