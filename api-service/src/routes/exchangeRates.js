const express = require('express');
const router = express.Router();
const ExchangeRate = require('../models/exchangeRate');


// Obtener las 10 tasas de cambio más recientes
router.get('/latest', async (req, res) => {
  try {
    const latestRates = await ExchangeRate.find().sort({ timestamp: -1 }).limit(10);
    res.json(latestRates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

 router.get('/source/:source/all', async (req, res) => {
  try {
    const { source } = req.params;
    console.log(source);

    // Consulta de ExchangeRate y orden por timestamp ascendente
    const rates = await ExchangeRate.find({ source: source })
                                    .sort({ timestamp: 1 });  // 1 es para ascendente
    console.log(rates);
    res.json(rates);  // O cualquier respuesta que necesites enviar
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los datos' });
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

router.get('/exchanges', async (req, res) => {
  try {
    const exchanges = await ExchangeRate.aggregate([
      { $group: { _id: "$source" } },
      { $project: { _id: 0, source: "$_id" } }
    ]);

    res.json(exchanges.map(doc => doc.source));
  } catch (error) {
    res.status(500).json({ error: 'Error fetching exchanges' });
  }
});

module.exports = router;
