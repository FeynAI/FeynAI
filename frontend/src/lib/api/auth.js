import api from './axios';

export const authApi = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  signup: async (email, password) => {
    const response = await api.post('/auth/signup', { email, password });
    return response.data;
  },
};