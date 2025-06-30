const { StartTranscriptionJobCommand } = require('@aws-sdk/client-transcribe');
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

    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `upload/${fileName}`,
      Body: fileContent,
      ContentType: req.file.mimetype,
    };

    // Transcribeを使用するのに必要な処理

    // ShowSpeakerLabelsをtrueにすることで話者分離をさせている
    // MaxSpeakerLabelsの数字を大きくすると話者分離できる最大の数を増やせる
    const command = new StartTranscriptionJobCommand({
      TranscriptionJobName: fileName.replace('.mp3', ''),
      LanguageCode: 'ja-JP',
      MediaFormat: 'mp3',
      Media: {
        MediaFileUri: `s3://${process.env.S3_BUCKET_NAME}/upload/${fileName}`,
      },
      Settings: {
        ShowSpeakerLabels: true,
        MaxSpeakerLabels: 2,
      },
      OutputBucketName: process.env.S3_BUCKET_NAME,
    });

    try {
      await voicesModel.sendS3(uploadParams);
      voicesModel.deleteFile([filePath]);
      await voicesModel.sendTranscribe(command);
      res.status(200).json({ message: 'アップロード成功', key: uploadParams.Key });
    } catch (err) {
      console.error('s3アップロード失敗：', err);
      res.status(500).json({ error: 'アップロードに失敗しました' });
    }
  },
};
