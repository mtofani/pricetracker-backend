// src/db.js (para pruebas)

const mongoose = require('mongoose');

async function connectToDatabase(uri) {
    if (process.env.NODE_ENV == 'mock') {
        // Simulamos una conexión exitosa sin conectar a la base de datos real
        console.log('Mocking database connection for mock');
        return Promise.resolve();
    }
    // En producción o desarrollo, conecta normalmente
    return mongoose.connect(uri, {
        serverApi: { version: '1', strict: true, deprecationErrors: true },
    });
}

module.exports = { connectToDatabase };
