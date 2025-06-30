const voicesModel = require('../models/Voices');

const fs = require('fs');

let fileName = '';

module.exports = {
  async convert(req, res) {
    const inputPath = req.file.path;
    const outputPath = `converted/${req.file.filename}.mp3`;

    try {
      await voicesModel.changeMp3(inputPath, outputPath);
      res.status(200).download(outputPath, 'converted.mp3', () => {
        voicesModel.deleteFile([inputPath, outputPath]);
      });
    } catch (err) {
      console.error('変換エラー：', err);
      res.status(500).send('変換に失敗しました');
    }
  },

  async uploadFile(req, res) {
    const filePath = req.file.path;
    const fileContent = fs.readFileSync(filePath);
    fileName = req.file.originalname;
  },
};
