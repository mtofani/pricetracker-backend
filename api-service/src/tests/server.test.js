const path = require('path'); // Importa path
require('dotenv').config({
  path: path.resolve(__dirname, '../../../.env')
});

const request = require('supertest');

// Acceder al puerto desde el archivo `.env`, con un valor predeterminado (3000)
const PORT = process.env.API_PORT || 3000;
const BASE_URL = `http://localhost:${PORT}/api`;

describe('API Endpoints', () => {
  it('should return 200 for GET /health', async () => {
    const res = await request(BASE_URL).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });

  it('should latest metric', async () => {
    const res = await request(BASE_URL).get('/exchange-rates/latest');
    expect(res.statusCode).toEqual(200);
  });

  // Agrega más tests para otros endpoints aquí
});
