import axios from 'axios';

// Use environment variable if set, otherwise default to /api (relative path)
const baseURL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: baseURL,
  timeout: 120000,
  headers: { 'Content-Type': 'application/json' },
});

export const analyzeFeedback = async (text) => {
  const response = await api.post('/analyze', { text });
  return response.data;
};

export default api;

