import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 120000,
  headers: { 'Content-Type': 'application/json' },
});

export const analyzeFeedback = async (text) => {
  const response = await api.post('/analyze', { text });
  return response.data;
};

export default api;
