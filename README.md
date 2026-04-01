# EchoMind AI - Feedback Intelligence Engine

EchoMind AI analyzes raw feedback and returns structured insights like sentiment, themes, complaints, improvements, positives, and keywords.

## Features

- Text, voice, and file-based input
- Gemini-powered feedback analysis
- Visual result components (cards, gauge, keyword cloud)
- Analysis history and export support

## Tech Stack

- Frontend: React, Vite, Axios, Tailwind
- Backend: Node.js, Express, Google Generative AI SDK

## Project Structure

```text
ai-feedback-analyzer/
  backend/
    controllers/
    routes/
    utils/
    server.js
  frontend/
    src/
      components/
      context/
      hooks/
      pages/
      utils/
```

## Prerequisites

- Node.js 18+
- npm
- At least one Gemini API key from https://aistudio.google.com/apikey

## Environment Variables

### Backend: backend/.env

```env
PORT=5000
GEMINI_API_KEY_1=your_first_key
GEMINI_API_KEY_2=your_second_key_optional
GEMINI_API_KEY_3=your_third_key_optional
```

Notes:
- The backend supports key rotation and accepts multiple key name styles for compatibility.
- Do not commit .env files.

### Frontend: frontend/.env.local

```env
# Local backend
VITE_API_URL=http://localhost:5000

# If deployed backend is on another domain, use that root URL
# VITE_API_URL=https://your-backend-domain.com
```

## Run Locally

### 1. Install backend dependencies

```bash
cd backend
npm install
```

### 2. Start backend

```bash
npm start
```

Backend runs on http://localhost:5000

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

### 4. Start frontend

```bash
npm run dev
```

Frontend runs on http://localhost:5173

## API Endpoint

- POST /api/analyze

Sample request:

```json
{
  "text": "The session quality was great but registration was slow."
}
```

## Code Quality Notes

- Code is split by feature and responsibility (controllers, routes, utils, pages, components).
- Utility functions are kept small and reusable.
- Comments are added only where logic is non-obvious.
- Environment-driven configuration is used for portability across local and deployed environments.
