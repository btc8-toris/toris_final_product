const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { TranscribeClient } = require('@aws-sdk/client-transcribe');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

// S3にファイルをアップロードするために必要な処理
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const transcribe = new TranscribeClient({ region: process.env.AWS_REGION });

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

  async sendS3(uploadParams) {
    return await s3.send(new PutObjectCommand(uploadParams));
  },

  async sendTranscribe(command) {
    return await transcribe.send(command);
  },

  async getUrl(commandInfo, validTime) {
    return await getSignedUrl(s3, commandInfo, validTime);
  },

  
};
