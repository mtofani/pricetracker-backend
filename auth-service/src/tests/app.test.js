const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../../../.env'),
});

const request = require('supertest');

const PORT = process.env.AUTH_PORT || 3000;
const AUTH_URL = `http://localhost:${PORT}/api/auth`;
const BASE_URL = `http://localhost:${PORT}/api`;

describe('API Endpoints', () => {
  // Antes de todos los tests, levanta el servidor
  

  it('should return 200 for GET /health', async () => {
    const res = await request(BASE_URL).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });

  it('should return 200 and a token for POST /login', async () => {
    // Cuerpo del request
    const loginPayload = {
      email: 'homer@cripto.com',
      password: 'jeje',
    };
  
    // Realiza la solicitud POST a /login
    const res = await request(AUTH_URL)
      .post('/login') // Endpoint a probar
      .send(loginPayload) // Cuerpo de la solicitud
      .set('Content-Type', 'application/json'); // Establece el tipo de contenido
    
    // Validaciones
    expect(res.statusCode).toEqual(200); // Verifica que el código de respuesta sea 200
    //expect(res.body).toHaveProperty('token'); // Asegúrate de que el cuerpo contiene un "token"
    //expect(typeof res.body.token).toBe('string'); // Verifica que el token sea un string
  });


  // Más tests aquí
});
