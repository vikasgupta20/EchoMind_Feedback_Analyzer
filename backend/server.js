import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import analyzeRoutes from './routes/analyze.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Routes
app.use('/api', analyzeRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'EchoMind AI backend is running' });
});

app.listen(PORT, () => {
  console.log(`🧠 EchoMind AI backend running on port ${PORT}`);
});
