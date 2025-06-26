import { Box, Button, Flex } from '@yamada-ui/react';
import React from 'react';
import { useState, useRef } from 'react';
// import './App.css';

function MediaRecorer() {
  const [audioURL, setAudioURL] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' }); //ここでマイクで取り込んだ音声をファイル化している

      console.log('💀 ~ startRecording ~ audioBlob:', audioBlob);
      const url = URL.createObjectURL(audioBlob); //ここで作成した音声のURLを作成している
      console.log('💀 ~ startRecording ~ url:', url);

      setAudioURL(url);
      audioChunksRef.current = []; // リセット
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  return (
    <div>
      <div className="p-4 rounded shadow-md bg-white w-full max-w-md mx-auto">
        <h1 className="text-xl font-bold mb-4">React マイク録音</h1>

        <div className="flex gap-2 mb-4">
          <Button
            variant="solid"
            colorScheme="green"
            onClick={startRecording}
            disabled={isRecording}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50">
            録音開始
          </Button>

          <Button
            variant="solid"
            colorScheme="red"
            onClick={stopRecording}
            disabled={!isRecording}
            className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50">
            録音停止
          </Button>
        </div>

        {audioURL && (
          <div>
            <p>録音された音声:</p>
            <audio
              src={audioURL}
              controls
            />
          </div>
        )}
        <Flex
          marginTop="4"
          direction="column"
          align="center">
            ↓カラー
          <Box marginTop="3">
            <Button
              colorScheme="primary"
              color="hibiscusDelight.50"
              size="lg">
              primary lg
            </Button>
          </Box>
          <Box marginTop="3">
            <Button
              colorScheme="secondary"
              size="lg">
              secondary lg
            </Button>
          </Box>
          <Box marginTop="3">
            <Button
              colorScheme="tertiary"
              size="lg">
              tertiary lg
            </Button>
          </Box>
          <Box marginTop="3">
            <Button
              ccolorScheme="warning"
              size="md">
              warning md
            </Button>
          </Box>
          <Box marginTop="3"></Box>
          <Button
            colorScheme="danger"
            size="sm">
            danger sm
          </Button>
        </Flex>
      </div>
    </div>
  );
}

export default MediaRecorer;
