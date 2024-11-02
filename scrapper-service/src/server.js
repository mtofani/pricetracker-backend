// scraper-service/src/server.js
const mongoose = require('mongoose');
const cron = require('node-cron');
const config = require('./config');
const { scrapeAllSites } = require('./services/scraper');

const clientOptions = { 
  serverApi: { version: '1', strict: true, deprecationErrors: true } 
};

mongoose.connect(config.MONGODB_URI, clientOptions)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Programar el scraping
cron.schedule(config.SCRAPE_INTERVAL, () => {
  console.log('Running scheduled scraping...');
  scrapeAllSites();
});

// Ejecutar el scraping inicial
scrapeAllSites();

// Mantener el proceso vivo
process.on('SIGTERM', () => {
  mongoose.connection.close();
  process.exit(0);
});