const express = require('express');
const router = express.Router();
const passport = require('passport');
const { infoIdentityCard, ProcessPrintDate, GetDateById, UpdateDate, InsertDate } = require('../controllers/schoolIdentityCard');

router.get('/info-identity-card/:id', passport.authenticate('jwt', {session:false}), infoIdentityCard)
router.get('/:id', passport.authenticate('jwt', {session:false}), GetDateById);
router.post('/', passport.authenticate('jwt', {session:false}), InsertDate);
router.post('/process-print-date', passport.authenticate('jwt', {session:false}), ProcessPrintDate);
router.put('/:id', passport.authenticate('jwt', {session:false}), UpdateDate);

module.exports = router;