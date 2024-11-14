
const path = require('path');


module.exports = {
  
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