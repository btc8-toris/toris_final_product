const express = require('express');
const router = express.Router();

router.post('/convert');
router.post('/upload');
router.get('/transcription-result/:jobName');

module.exports = router;
