const {
  StartTranscriptionJobCommand,
  GetTranscriptionJobCommand,
} = require('@aws-sdk/client-transcribe');
const voicesModel = require('../models/Voices');

const fs = require('fs');
const { GetObjectCommand } = require('@aws-sdk/client-s3');

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

  async getTranscript(req, res) {
    const jobName = req.params.jobName;

    try {
      // Transcribeジョブの状態を取得
      const command = new GetTranscriptionJobCommand({ TranscriptionJobName: jobName });
      const response = voicesModel.sendTranscribe(command);
      const job = response.TranscriptionJob;
      if (job.TranscriptionJobStatus === 'COMPLETED') {
        const transcriptKey = `${jobName},json`;
        const commandInfo = new GetObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: transcriptKey,
        });
        const validTime = { expiresIn: 3600 };
        const signedUrl = await getUrl(commandInfo, validTime);
        const transcriptRes = await fetch(signedUrl).then((res) => res.json());
        const transcriptText = transcriptRes.results.audio_segments;
        res.json({ status: 'completed', text: transcriptText });
      } else if (job.TranscriptionJobStatus === 'IN_PROGRESS') {
        res.json({ status: 'in_progress' });
      } else {
        res.status(500).json({ status: 'failed', reason: 'FailureReason' });
      }
    } catch (err) {
      res.status(500).json({ error: 'ジョブ取得に失敗しました', details: err.message });
    }
  },
};
