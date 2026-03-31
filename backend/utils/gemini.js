import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

// Multiple API keys for rotation when rate limited
// Use GEMINI_API_KEY_1, GEMINI_API_KEY_2, GEMINI_API_KEY_3 etc from .env
const API_KEYS = [
  process.env.GEMINI_API_KEY,
  process.env.GEMINI_API_KEY_1,
  process.env.GEMINI_API_KEY2,
  process.env.GEMINI_API_KEY_2,
  process.env.GEMINI_API_KEY3,
  process.env.GEMINI_API_KEY_3,
].filter(Boolean);

if (API_KEYS.length === 0) {
  console.warn('⚠️ WARNING: No Gemini API keys configured in environment variables.');
  console.warn('Add GEMINI_API_KEY or GEMINI_API_KEY_1 / GEMINI_API_KEY2 style keys.');
}

let currentKeyIndex = 0;

export function getModel() {
  const key = API_KEYS[currentKeyIndex];
  if (!key) {
    throw new Error('No Gemini API key available. Check your .env configuration.');
  }
  const genAI = new GoogleGenerativeAI(key);
  return genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
}

export function rotateKey() {
  currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
  console.log(`Rotated to API key ${currentKeyIndex + 1}/${API_KEYS.length}`);
}

export { API_KEYS };

