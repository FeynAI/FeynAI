// src/lib/api/sessions.js
import api from './axios';

export const sessionApi = {
  startSession: async (topic) => {
    const response = await api.post('/sessions/start-session', { topic });
    return response.data;
  },
  
  getSessionHistory: async (sessionId) => {
    const response = await api.get(`/sessions/${sessionId}`);
    return response.data;
  },
};