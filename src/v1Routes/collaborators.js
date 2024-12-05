const express = require('express');
const router = express.Router();
const passport = require('passport');
const upload = require('../utils/upload');
const { insert, insertCollaborator } = require('../controllers/collaborators');
const { verifyExcel } = require('../validations/excel');
const { verifyData } = require('../validations/data');

router.post('/', passport.authenticate('jwt', {session:false}), upload.single('excel'), verifyExcel, insert);
router.post('/insert-person', passport.authenticate('jwt', {session:false}), verifyData, insertCollaborator);

module.exports = router;