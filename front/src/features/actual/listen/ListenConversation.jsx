import { Container, IconButton, Text, VStack, Image, Motion, Flex, Box } from '@yamada-ui/react';
import React from 'react';
import { useEffect, useState, useContext } from 'react';
import RecordRTC from 'recordrtc';
import Header from '../../../components/header/Header';
import startIcon from '/play_circle.svg';
import stopIcon from '/stop_circle.svg';
import micOnIcon from '/mic_on.svg';
import micOffIcon from '/mic_off.svg';
import { context } from '../../../app/App';
import Footer from '../../../components/footer/Footer';
import recordingIcon from '/recording.svg';
import saveIcon from '/save.svg';
import axios from 'axios';
import { useLocation } from 'react-router';

function ListenConversationPage() {
  const [recorder, setRecorder] = useState(null);
  const [recordings, setRecordings] = useState();
  const [listening, setListening] = useState(false);
  const { BASE_URL, JSON_HEADER } = useContext(context);
  const [save, setSave] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const location = useLocation();
  const receiveAnswer = location.state.data;

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  // 認識が開始されるたびに連続した結果をキャプチャ
  recognition.continuous = true;
  // 音声認識システムが中間的な結果を返す　最終的な結果だけ返す場合はfalse
  recognition.interimResults = true;
  recognition.lang = 'ja-JP'; // 日本語対応

  const onStart = () => {
    setListening(true);
    recognition.start();
  };

  const onStop = () => {
    recognition.stop();
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
    setSave(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      const newRecorder = new RecordRTC(stream, { type: 'audio' });
      newRecorder.startRecording();
      setRecorder(newRecorder);
      setStartTime(new Date());
      onStart();
    } catch (error) {
      if (error) {
        console.log(`録音の開始に失敗しました：${error.message}`);
      }
    }
  };

  const logPost = async () => {
    const stopTime = new Date();
    const time = Math.abs((stopTime.getTime() - startTime.getTime()) / 1000);
    const data = {
      pair_id: receiveAnswer.pairId,
      transcript_url: receiveAnswer.transcript_url,
      conversation_time: time,
      read_flag: false,
    };
    console.log('🍓 ~ logPost ~ data:', data);

    await axios.post(`${BASE_URL}/api/conversations/transcripts`, data, JSON_HEADER).then((res) => {
      console.log(res.data.message);
    });
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stopRecording(async () => {
        const blob = recorder.getBlob();
        onStop();
        const newRecording = blob;
        receiveAnswer.transcript_url =
          Math.random().toString(32).substring(2) + new Date().getTime().toString(32);

        setRecordings(newRecording);

        await logPost();
        setSave(true);
        setTimeout(() => setSave(false), 10000);
      });
    }
  };

  useEffect(() => {
    if (recordings) {
      (async () => {
        await post(receiveAnswer.transcript_url);
      })();
    }
  }, [recordings]);

  const post = async (mp3File) => {
    if (recordings) {
      const formData = new FormData();
      formData.append('audio', recordings);

      const mp3Blob = await fetch(`${BASE_URL}/api/voices/convert`, {
        method: 'POST',
        body: formData,
      }).then((res) => res.blob());

      const uploadForm = new FormData();

      // ３つ目の引数はファイル名として指定される
      uploadForm.append('audio', mp3Blob, `${mp3File}.mp3`);

      await fetch(`${BASE_URL}/api/voices/upload`, {
        method: 'POST',
        body: uploadForm,
      }).then((res) => res.json());
    }
  };

  return (
    <>
      <Container
        centerContent="true"
        gap="none"
        p="0">
        {listening ? (
          <>
            <Flex
              bg="#3e4a59"
              position="fixed"
              zIndex={1000}
              direction="row"
              justify="space-around"
              align="center"
              width="100%"
              height="52px"
              top={0}>
              <Text
                zIndex={0}
                position="absolute"
                fontSize="20px"
                color="white">
                ふたり対話
              </Text>
            </Flex>
          </>
        ) : (
          <>
            <Header title={'ふたり対話'} />
          </>
        )}
        {save ? (
          <Flex
            width="100%"
            zIndex={1100}
            justify="flex-end">
            <Motion
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}>
              <Image
                marginTop="5px"
                marginRight="5px"
                width="83px"
                src={saveIcon}
                alt="保存中"
              />
            </Motion>
          </Flex>
        ) : (
          <Box
            marginTop="5px"
            height="40px"></Box>
        )}
        <Container
          marginTop="15px"
          paddingTop="60px">
          <VStack alignItems="center">
            <Text
              color="tertiary"
              fontSize="23px"
              padding="md">
              会話をひろう
            </Text>
            {listening ? (
              <VStack
                align="center"
                gap="13px">
                <Image
                  src={micOnIcon}
                  alt="マイクon"
                  boxSize="246px"
                />
                <Image
                  src={recordingIcon}
                  alt="録音中"
                  height="34px"
                />
                <IconButton
                  icon={
                    <Image
                      src={stopIcon}
                      alt="録音停止"
                    />
                  }
                  onClick={stopRecording}
                  size="auto"
                  width="87px"
                  alignItems="center"
                  variant="primary"></IconButton>
              </VStack>
            ) : (
              <VStack
                align="center"
                gap="100px">
                <Image
                  marginTop="44px"
                  src={micOffIcon}
                  alt="マイクoff"
                  boxSize="162px"
                />
                <IconButton
                  icon={
                    <Image
                      src={startIcon}
                      alt="録音開始"
                    />
                  }
                  onClick={startRecording}
                  size="auto"
                  width="87px"
                  alignItems="center"
                  variant="primary"></IconButton>
              </VStack>
            )}
          </VStack>
        </Container>
        {listening ? <></> : <Footer />}
      </Container>
    </>
  );
}

export default ListenConversationPage;
