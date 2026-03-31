import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Lazy load routes on first request to avoid top-level await issues
let routesLoaded = false;
let analyzeRoutes = null;

app.use('/api', async (req, res, next) => {
    try {
        if (!routesLoaded) {
            const module = await import('../routes/analyze.js');
            analyzeRoutes = module.default;
            routesLoaded = true;
        }
        analyzeRoutes(req, res, next);
    } catch (err) {
        console.error('Error loading routes:', err);
        res.status(500).json({
            error: 'Routes failed to load',
            message: err.message
        });
    }
});

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

