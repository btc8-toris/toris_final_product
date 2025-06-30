const voicesModel = require('../models/Voices');

module.exports = {
  async convert(req, res) {
    const inputPath = req.file.path;
    const outputPath = `converted/${req.file.filename}.mp3`;

    try {
      const data = await voicesModel.changeMp3(inputPath, outputPath);
      res.status(200).download(outputPath);
      await voicesModel.deleteFile([inputPath, outputPath]);
    } catch {}
  },
};
