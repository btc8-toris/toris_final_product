const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

module.exports = {
  // MP3へ変換
  async changeMp3(inputPath, outputPath) {
    return await ((resolve, reject) => {
      ffmpeg(inputPath)
        .toFormat('mp3')
        .on('end', () => {
          resolve(outputPath);
        })
        .on('error', (err) => {
          reject(err);
        })
        .save(outputPath);
    });
  },

  deleteFile(paths) {
    paths.forEach((path) => {
      if (fs.existsSync(path)) {
        fs.unlinkSync(path);
      }
    });
  },
};
