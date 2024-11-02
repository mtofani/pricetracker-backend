const express = require('express');
const router = express.Router();
const ExchangeRate = require('../models/exchangeRate');


// Obtener las tasas de cambio más recientes
router.get('/latest', async (req, res) => {
  try {
    const latestRates = await ExchangeRate.find().sort({ timestamp: -1 }).limit(10);
    res.json(latestRates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener el historial de tasas de cambio para una fuente específica
router.get('/history/:source', async (req, res) => {
  try {
    const history = await ExchangeRate.find({ source: req.params.source })
      .sort({ timestamp: -1 })
      .limit(100);
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
