// src/lib/hooks/useChat.js
'use client';

import { useState } from 'react';
import { sessionApi } from '@/lib/api/session';
import { chatApi } from '@/lib/api/chat';

export function useChat() {
 // State management
 const [sessions, setSessions] = useState([]);
 const [currentSession, setCurrentSession] = useState(null);
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

 // Load all sessions
 const loadSessions = async () => {
   try {
     setLoading(true);
     clearError();
     const response = await sessionApi.getSessionHistory();
     setSessions(response);
   } catch (err) {
     setError('Failed to load sessions. Please try again.');
     console.error('Load sessions error:', err);
   } finally {
     setLoading(false);
   }
 };

 // Load messages for a specific session
 const loadSessionMessages = async (sessionId) => {
   try {
     setLoading(true);
     clearError();
     const response = await sessionApi.getSessionHistory(sessionId);
     setMessages(response);
   } catch (err) {
     setError('Failed to load chat history. Please try again.');
     console.error('Load messages error:', err);
   } finally {
     setLoading(false);
   }
 };

 // Start a new chat session
 const startNewSession = async (topic) => {
   try {
     setLoading(true);
     clearError();
     const response = await sessionApi.startSession(topic);
     setCurrentSession(response);
     setSessions(prev => [...prev, response]);
     setMessages([]); // Clear messages for new session
     return response;
   } catch (err) {
     setError('Failed to start new session. Please try again.');
     console.error('Start session error:', err);
     throw err;
   } finally {
     setLoading(false);
   }
 };

 // Add a new message
 const addMessage = (content, role) => {
   const newMessage = {
     role,
     message: content,
     timestamp: new Date().toISOString()
   };
   setMessages(prev => [...prev, newMessage]);
 };

 // Handle new message submission
 const handleNewMessage = async (content) => {
   try {
     // Add user message immediately for instant feedback
     addMessage(content, 'user');

     // If we're in development/testing mode, simulate AI response
     if (process.env.NODE_ENV === 'development') {
       setTimeout(() => {
         addMessage("That's interesting! Can you explain more about that?", 'assistant');
       }, 1000);
       return;
     }

     // For production: Send to backend
     const formData = new FormData();
     formData.append('input_text', content);
     formData.append('session_id', currentSession.id);
     formData.append('topic', currentSession.topic);

     const response = await chatApi.submitAnswer(formData);
     
     if (response.message) {
       addMessage(response.message, 'assistant');
     }
     if (response.follow_up_question) {
       addMessage(response.follow_up_question, 'assistant');
     }

   } catch (err) {
     setError('Failed to send message. Please try again.');
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
   loadSessionMessages,
   startNewSession,
   addMessage,
   handleNewMessage
 };
}