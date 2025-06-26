const express = require('express');
const router = express.Router();
const { addPairs, getPairsInfo } = require('../controllers/pairsController');

router.post('/', addPairs);
router.get('/:user_id', getPairsInfo);

module.exports = router;
