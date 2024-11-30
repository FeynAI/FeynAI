// src/lib/api/chat.js
import api from './axios';

export const chatApi = {
  submitAnswer: async (sessionId, input, topic) => {
    const formData = new FormData();
    
    if (typeof input === 'string') {
      formData.append('input_text', input);
    } else {
      formData.append('input', input);
    }
    
    formData.append('session_id', sessionId);
    formData.append('topic', topic);

    const response = await api.post('/submit-answer', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  }
};