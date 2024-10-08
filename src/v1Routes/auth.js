const express = require('express');
const router = express.Router();
const { login } = require('../controllers/auth');
const { check } = require('../validations/auth');

router.get('/:username/:password', check, login);

module.exports = router;

