import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import analyzeRoutes from '../routes/analyze.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Routes
app.use('/api', analyzeRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'EchoMind AI backend is running' });
});

// Default route
app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'EchoMind AI backend is running' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
    });
});

export default app;
