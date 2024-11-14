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

};