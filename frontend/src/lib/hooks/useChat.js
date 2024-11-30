// src/lib/hooks/useChat.js
'use client';

import { useState } from 'react';
import { chatApi } from '@/lib/api/chat';

export function useChat() {
  // State management
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState({
    id: '29b98fcd-a957-4d01-ba53-f1414a3335aa', // Using the fixed session ID for now
    topic: 'Cosmology' // Using fixed topic for now
  });
  const [messages, setMessages] = useState([
    // Initial welcome message
    {
      role: 'assistant',
      message: "Hi, I'm Feyn! What would you like to teach me about?",
      timestamp: new Date().toISOString()
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Error handling
  const clearError = () => setError(null);

  // Load all sessions - simplified for development
  const loadSessions = async () => {
    setSessions([currentSession]); // Just use the temporary session
  };

  // Simplified for development
  const startNewSession = async (topic) => {
    setCurrentSession({
      id: '29b98fcd-a957-4d01-ba53-f1414a3335aa',
      topic: topic
    });
    setMessages([]);
    return currentSession;
  };

  // Add a new message
  const addMessage = (content, role) => {
    const newMessage = {
      role,
      message: content,
      timestamp: new Date().toISOString()
    };
    console.log('Adding message:', newMessage);
    setMessages(prev => {
      console.log('Previous messages:', prev);
      return [...prev, newMessage];
    });
  };

  // Handle new message submission
  const handleNewMessage = async (content) => {
    try {
      // Add user message immediately for instant feedback
      addMessage(content, 'user');

      // Make API call to submit answer
      const response = await chatApi.submitAnswer(
        currentSession.id,
        content,
        currentSession.topic
      );

      // Log API response
      console.log('API Response:', response);

      // Add AI responses to chat
      if (response.message) {
        addMessage(response.message, 'assistant');
      }
      if (response.follow_up_question) {
        addMessage(response.follow_up_question, 'assistant');
      }

    } catch (err) {
      // Enhanced error handling
      if (err.response?.status === 401) {
        setError('Authentication failed. Please log in again.');
      } else {
        setError('Failed to send message. Please try again.');
      }
      console.error('Message submission error:', err);
    }
  };

  return {
    sessions,
    currentSession,
    messages,
    loading,
    error,
    clearError,
    loadSessions,
    startNewSession,
    addMessage,
    handleNewMessage
  };
}