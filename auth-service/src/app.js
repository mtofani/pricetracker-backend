// src/server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes/authRoutes');
const { connectToDatabase } = require('./db');

// Configuración básica
require('dotenv').config({
    path: path.resolve(__dirname, '../../.env')
});

if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is required');
}

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', apiRoutes);

// Health check para Docker
app.get('/api/health', (_, res) => res.status(200).json({ status: 'ok' }));

async function startServer() {
    try {
        await connectToDatabase(process.env.MONGODB_URI);
        console.log('Connected to database');

        const port = process.env.AUTH_PORT || 3000;
        
        app.listen(port, () => {
            console.log(`API Server running on port ${port}`);
        });

        // Graceful shutdown
        process.on('SIGTERM', async () => {
            await mongoose.connection.close();
            process.exit(0);
        });
        
    } catch (error) {
        console.error('Startup error:', error);
        process.exit(1);
    }
}

startServer();


