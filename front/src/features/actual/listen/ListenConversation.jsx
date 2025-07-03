import { Button, Center, Container, IconButton, Text, VStack } from '@yamada-ui/react';
import React from 'react';
import { useEffect, useState } from 'react';
import RecordRTC from 'recordrtc';
import Header from '../../../components/header/Header';
import { CirclePlayIcon } from '@yamada-ui/lucide';
import { CircleStopIcon } from '@yamada-ui/lucide';

function ListenConversationPage() {
  const [transcript, setTranscript] = useState([]);
  const [recorder, setRecorder] = useState(null);
  // const [error, setError] = useState('');
  const [recordings, setRecordings] = useState();
  const [listening, setListening] = useState(false);
  const [s3Key, setS3Key] = useState('');
  // const [audio, setAudio] = useState();

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  // 認識が開始されるたびに連続した結果をキャプチャ
  recognition.continuous = true;
  // 音声認識システムが中間的な結果を返す　最終的な結果だけ返す場合はfalse
  recognition.interimResults = true;
  recognition.lang = 'ja-JP'; // 日本語対応

  const onStart = () => {
    setTranscript('');
    setListening(true);
    recognition.start();
  };

  const onStop = () => {
    recognition.stop();
    setTranscript('');
    setListening(false);
  };

  useEffect(() => {
    return () => {
      if (recorder) {
        recorder.destroy();
      }
    };
  }, [recorder]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      const newRecorder = new RecordRTC(stream, { type: 'audio' });
      newRecorder.startRecording();
      setRecorder(newRecorder);

      onStart();
    } catch (error) {
      if (error) {
        console.log(`録音の開始に失敗しました：${error.message}`);
      }
    }
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stopRecording(() => {
        const blob = recorder.getBlob();
        onStop();

        const id = Math.random().toString(32).substring(2) + new Date().getTime().toString(32);

        const newRecording = blob;

        setRecordings(newRecording);
      });
    }
  };

  useEffect(() => {
    if (recordings) {
      (async () => {
        const mp3File = Math.random().toString(32).substring(2) + new Date().getTime().toString(32);
        await post(mp3File);
        await text(mp3File);
      })();
    }
  }, [recordings]);

  const post = async (mp3File) => {
    console.log(recordings);
    if (recordings) {
      const formData = new FormData();
      formData.append('audio', recordings);

      const mp3Blob = await fetch('/api/voices/convert', {
        method: 'POST',
        body: formData,
      }).then((res) => res.blob());

      const uploadForm = new FormData();

      // ３つ目の引数はファイル名として指定される
      uploadForm.append('audio', mp3Blob, `${mp3File}.mp3`);

      const uploadRes = await fetch('/api/voices/upload', {
        method: 'POST',
        body: uploadForm,
      }).then((res) => res.json());
      setS3Key(uploadRes.key);
    }
  };

  const text = async (mp3File) => {
    console.log('🍓 ~ text ~ mp3File:', mp3File);
    // const aaa = 'test34';
    const data = await fetch(`/api/voices/transcription-result/${mp3File}`).then((res) =>
      res.json(),
    );

    console.log('🍓 ~ text ~ data:', data.status);
    console.log('🍓 ~ text ~ data.text:', data.text);
    if (data.status === 'completed') {
      setTranscript([data.text]);
    } else if (data.status === 'in_progress') {
      setTimeout(async () => await text(mp3File), 5000);
    } else {
      console.error('文字起こしに失敗：', data.reason);
    }
  };

  return (
    <>
      <Container
        centerContent="true"
        gap="none"
        p="0">
        <Header title={'ふたり対話'} />
        <Container
          marginTop="60px"
          paddingTop="60px">
          <VStack alignItems="center">
            <Text
              // textAlign="center"

              fontSize="23px"
              padding="md">
              会話をひろう
            </Text>
            {listening ? (
              <IconButton
                icon={<CircleStopIcon size="87px" />}
                onClick={stopRecording}
                size="auto"
                width="87px"
                alignItems="center"
                variant="primary"></IconButton>
            ) : (
              <IconButton
                icon={<CirclePlayIcon size="87px" />}
                onClick={startRecording}
                size="auto"
                width="87px"
                alignItems="center"
                variant="primary"></IconButton>
            )}
          </VStack>

          {transcript ? (
            transcript.map((elem) => {
              return (
                <div key={elem.id}>
                  {elem.speaker_lavel}
                  {elem.transcript}
                </div>
              );
            })
          ) : (
            <></>
          )}
        </Container>
      </Container>
    </>
  );
}

export default ListenConversationPage;
