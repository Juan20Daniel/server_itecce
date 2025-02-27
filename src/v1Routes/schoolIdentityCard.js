const express = require('express');
const router = express.Router();
const passport = require('passport');
const { infoIdentityCard } = require('../controllers/schoolIdentityCard');

router.get('/info-identity-card/:id', 
    passport.authenticate('jwt', {session:false}), 
    infoIdentityCard
);

module.exports = router;