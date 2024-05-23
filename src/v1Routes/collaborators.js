const express = require('express');
const router = express.Router();
const passport = require('passport');
const upload = require('../utils/upload');
const { insert, getAll, getById, getByFullname } = require('../controllers/collaborators');
const { verifyFile, verifyId, verifyFullname, verifyOffset } = require('../validations/verifyFile');

router.get('/', passport.authenticate('jwt', {session:false}), verifyOffset, getAll);
router.get('/search-by-id/:id', passport.authenticate('jwt', {session:false}), verifyId, verifyOffset, getById);
router.get('/search-by-name/:fullname', passport.authenticate('jwt', {session:false}), verifyFullname, verifyOffset, getByFullname);
router.post('/', passport.authenticate('jwt', {session:false}), upload.single('excel'), verifyFile, insert);














































module.exports = router;