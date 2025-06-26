import React from 'react'
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
        <button
          onClick={startRecording}
          disabled={isRecording}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50">
          録音開始
        </button>

        <button
          onClick={stopRecording}
          disabled={!isRecording}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50">
          録音停止
        </button>
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
    </div>
    </div>
  )
}

export default MediaRecorer