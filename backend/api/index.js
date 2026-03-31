import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get current directory using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ResolveRoutes path relative to current file
const routesPath = join(__dirname, '../routes/analyze.js');
console.log('Attempting to import routes from:', routesPath);

// Import routes
const { default: analyzeRoutes } = await import(routesPath);

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

