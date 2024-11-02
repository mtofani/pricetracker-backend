const dotenv = require('dotenv');
const path = require('path');

// Busca el .env en la raíz del proyecto
const envPath = path.resolve(__dirname, '../.env'); // Sube un nivel desde src
console.log('Attempting to load .env from:', envPath);

const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error('Error loading .env file:', result.error);
  throw result.error;

}


module.exports = {
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI,
  SCRAPE_INTERVAL: process.env.SCRAPE_INTERVAL || '*/15 * * * *',
  SITES: [
    { name: 'bitexchange', url: 'https://www.bitexchange.es/es/barcelona' },
    {
      name: 'europound',
      url: 'https://www.europound.es/es/inicio-2/?valor=4663',
      retryDelay: 2000,
    }
    // Agrega más sitios para scraping aquí
  ]
};