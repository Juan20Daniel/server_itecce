const express = require('express');
const router = express.Router();
const passport = require('passport');
const upload = require('../utils/upload');
const { insert, insertCollaborator } = require('../controllers/collaborators');
const { verifyFile } = require('../validations/verifyFile');
const { verifyData } = require('../validations/verifyData');

router.post('/', passport.authenticate('jwt', {session:false}), upload.single('excel'), verifyFile, insert);
router.post('/insert-person', passport.authenticate('jwt', {session:false}), verifyData, insertCollaborator);

module.exports = router;