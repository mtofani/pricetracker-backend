// scraper-service/src/server.js
const { scrapeAllSites } = require('./services/scraper');
const express = require('express');
const path = require('path');
const cron = require('node-cron');
const { connectToDatabase } = require('./db');

// Configuración básica
require('dotenv').config({
    path: path.resolve(__dirname, '../.env')
});

if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is required');
}

const app = express();

// Middlewares
app.use(express.json());


// Health check para Docker
app.get('/health', (_, res) => res.status(200).json({ status: 'ok' }));

async function startServer() {
    try {
        await connectToDatabase(process.env.MONGODB_URI);
        console.log('Connected to database');

        const port = process.env.PORT || 3000;
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
cron.schedule(process.env.SCRAPE_INTERVAL, () => {
  console.log('Running scheduled scraping...');
  scrapeAllSites();
});

// Ejecutar el scraping inicial
scrapeAllSites();