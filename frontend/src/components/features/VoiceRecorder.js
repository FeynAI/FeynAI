// src/components/features/chat/VoiceRecorder.js
'use client';

import { useState, useRef } from 'react';

export default function VoiceRecorder({ onRecordingComplete, disabled }) {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    try {
      // Request microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Create media recorder
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      // Handle data available event
      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      // Handle recording stop
      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        onRecordingComplete(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      // Start recording
      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording:', error);
      // Handle microphone permission denied
      if (error.name === 'NotAllowedError') {
        alert('Microphone permission is required to record audio.');
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <button
      type="button"
      onClick={isRecording ? stopRecording : startRecording}
      disabled={disabled}
      className={`p-2 rounded-full transition-colors ${
        isRecording 
          ? 'bg-red-50 text-red-500 animate-pulse' 
          : 'hover:bg-gray-100 text-gray-500'
      }`}
    >
      🎤
    </button>
  );
}