const mongoose = require('mongoose');

const exchangeRateSchema = new mongoose.Schema({
  source: String,
  fromCurrency: String,
  toCurrency: String,
  rate: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ExchangeRate', exchangeRateSchema);
