const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const db = require('../db');


router.post('/register', registerUser);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;