const {
  StartTranscriptionJobCommand,
  GetTranscriptionJobCommand,
  TranscriptionJobStatus,
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
      // AWSを無闇に使用しないようにコメントアウト
      // await voicesModel.sendS3(uploadParams);
      voicesModel.deleteFile([filePath]);
      // AWSを無闇に使用しないようにコメントアウト
      // await voicesModel.sendTranscribe(command);
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
      // AWSを無闇に使用しないようにコメントアウト
      // const response = await voicesModel.sendTranscribe(command);

      // AWSを無闇に使用しないようにコメントアウト
      // const job = response.TranscriptionJob;
      // console.log('🍓 ~ app.get ~ job:', job.TranscriptionJobStatus);

      // テスト用のダミーデータ
      const job = { TranscriptionJobStatus: 'COMPLETED' };
      if (job.TranscriptionJobStatus === 'COMPLETED') {
        console.log('🙅🏻‍♀️');

        const transcriptKey = `${jobName}.json`;
        const commandInfo = new GetObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: transcriptKey,
        });
        const validTime = { expiresIn: 3600 };
        // AWSを無闇に使用しないようにコメントアウト
        // const signedUrl = await voicesModel.getUrl(commandInfo, validTime);
        // const transcriptRes = await fetch(signedUrl).then((res) => res.json());
        // const transcriptText = transcriptRes.results.audio_segments;
        // テスト用のダミーデータ
        const transcriptText = [
          {
            id: 0,
            transcript: '決勝に残っても',
            start_time: '0.3',
            end_time: '1.379',
            speaker_label: 'spk_0',
          },
          {
            id: 1,
            transcript: '残んなくても、僕は笑い続けたい。',
            start_time: '1.379',
            end_time: '3.519',
            speaker_label: 'spk_1',
          },
          {
            id: 2,
            transcript: '僕やっぱお笑い好きだなって気づいてさ。',
            start_time: '4.159',
            end_time: '6.34',
            speaker_label: 'spk_1',
          },
          {
            id: 3,
            transcript: 'もう一度ピレッジマウス',
            start_time: '7.11',
            end_time: '8.22',
            speaker_label: 'spk_1',
          },
          {
            id: 4,
            transcript: 'に人生かけるわ。',
            start_time: '8.22',
            end_time: '9.239',
            speaker_label: 'spk_0',
          },
          {
            id: 5,
            transcript: 'やっぱり',
            start_time: '11.229',
            end_time: '11.789',
            speaker_label: 'spk_0',
          },
          {
            id: 6,
            transcript: '今回を区切りにしたい。',
            start_time: '13.369',
            end_time: '14.88',
            speaker_label: 'spk_1',
          },
          {
            id: 7,
            transcript: '決勝に残れなかったら。',
            start_time: '15.329',
            end_time: '17.079',
            speaker_label: 'spk_0',
          },
          {
            id: 8,
            transcript: 'やめよ。',
            start_time: '18.68',
            end_time: '19.399',
            speaker_label: 'spk_0',
          },
          {
            id: 9,
            transcript: 'やだよ。',
            start_time: '20.409',
            end_time: '21.379',
            speaker_label: 'spk_1',
          },
          {
            id: 10,
            transcript: 'じゃ、僕たち、まだできるって。',
            start_time: '22.19',
            end_time: '25.09',
            speaker_label: 'spk_1',
          },
          {
            id: 11,
            transcript: 'こんなもんじゃないって。',
            start_time: '25.78',
            end_time: '27.37',
            speaker_label: 'spk_1',
          },
          {
            id: 12,
            transcript: 'よし、じゃあ、もう一年だけやってみよう。',
            start_time: '27.94',
            end_time: '31.409',
            speaker_label: 'spk_1',
          },
          {
            id: 13,
            transcript: 'あ、お願い。',
            start_time: '34.93',
            end_time: '36.24',
            speaker_label: 'spk_1',
          },
          {
            id: 14,
            transcript: '食べ物が覚めて。',
            start_time: '36.889',
            end_time: '38.5',
            speaker_label: 'spk_1',
          },
          {
            id: 15,
            transcript: '友達の',
            start_time: '40.4',
            end_time: '41.24',
            speaker_label: 'spk_1',
          },
          {
            id: 16,
            transcript: 'な、そんな',
            start_time: '54.849',
            end_time: '55.93',
            speaker_label: 'spk_1',
          },
          {
            id: 17,
            transcript: 'だって今回めっちゃ',
            start_time: '59.45',
            end_time: '60.56',
            speaker_label: 'spk_1',
          },
          {
            id: 18,
            transcript: '楽しかったから、ここでやめたいんだよ。',
            start_time: '62.459',
            end_time: '64.83',
            speaker_label: 'spk_0',
          },
          {
            id: 19,
            transcript: 'お笑い好きになって、この世界入ってさ。',
            start_time: '65.569',
            end_time: '68.29',
            speaker_label: 'spk_0',
          },
          {
            id: 20,
            transcript: 'うまくいかなくてさ、俺が好きなのかどうなのかもしなくなってさ。',
            start_time: '69.599',
            end_time: '74.279',
            speaker_label: 'spk_0',
          },
          {
            id: 21,
            transcript: 'お前とかが',
            start_time: '76.069',
            end_time: '77.209',
            speaker_label: 'spk_0',
          },
          {
            id: 22,
            transcript: '仲悪くなっちゃって。',
            start_time: '78.54',
            end_time: '80.489',
            speaker_label: 'spk_0',
          },
          {
            id: 23,
            transcript: 'イマダさん、',
            start_time: '90.449',
            end_time: '91.419',
            speaker_label: 'spk_0',
          },
          {
            id: 24,
            transcript: '楽しかったまま終われる気がするからさ。だから、',
            start_time: '94.639',
            end_time: '97.559',
            speaker_label: 'spk_0',
          },
          {
            id: 25,
            transcript: 'もしダメだったら、',
            start_time: '98.62',
            end_time: '99.79',
            speaker_label: 'spk_1',
          },
          {
            id: 26,
            transcript: '友達に戻ろう。',
            start_time: '102.12',
            end_time: '103.349',
            speaker_label: 'spk_1',
          },
          {
            id: 27,
            transcript: 'もし',
            start_time: '104.12',
            end_time: '104.489',
            speaker_label: 'spk_0',
          },
        ];
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
