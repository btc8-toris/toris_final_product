const express = require('express');
const router = express.Router();
const { convert, uploadFile, getTranscript } = require('../controllers/voicesController');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.post('/convert', upload.single('audio'), convert);
router.post('/upload', upload.single('audio'), uploadFile);
router.get('/transcription-result/:jobName', getTranscript);

module.exports = router;
