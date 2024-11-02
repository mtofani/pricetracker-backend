// api-service/src/server.js
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const exchangeRatesRoutes = require('./routes/exchangeRates');

const app = express();

const clientOptions = { 
  serverApi: { version: '1', strict: true, deprecationErrors: true } 
};

mongoose.connect(config.MONGODB_URI, clientOptions)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/exchange-rates', exchangeRatesRoutes);

app.listen(config.PORT, () => {
  console.log(`API Server running on port ${config.PORT}`);
});

process.on('SIGTERM', () => {
  mongoose.connection.close();
  process.exit(0);
});