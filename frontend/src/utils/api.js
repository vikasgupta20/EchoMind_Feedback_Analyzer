import axios from 'axios';

const normalizeBaseURL = (rawUrl) => {
  if (!rawUrl || typeof rawUrl !== 'string') return '/api';

  const trimmed = rawUrl.trim().replace(/\/+$/, '');
  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
};

// Accept VITE_API_URL with or without /api suffix.
const baseURL = normalizeBaseURL(import.meta.env.VITE_API_URL);

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

