const { chromium } = require('playwright');
const ExchangeRate = require('../models/exchangeRate.js');
const config = require('../config.js');

async function scrapeExchangeRate(site) {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    await page.goto(site.url, { waitUntil: 'networkidle' });

    let rate;
    switch(site.name) {
      case 'bitexchange':
        rate = await page.$eval('input[name="input_EUR_to_currency"]', el => el.value);
        rate = parseFloat(rate) / 100;  // Division por como muestra BITEX
        break;
        case 'europound':
        rate = await page.evaluate(() => {
          // Encuentra el li que contiene "US Dollar"
          const liElements = Array.from(document.querySelectorAll('.banner-table-oficina li.list-money'));
          const usdLi = liElements.find(li => li.textContent.includes('US Dollar'));
          
          if (usdLi) {
            // Obtiene el último p dentro del li (que contiene el valor)
            const rateParagraph = usdLi.querySelector('p:last-child');
            if (rateParagraph) {
              const rateText = rateParagraph.textContent.trim();
              return parseFloat(rateText);
            }
          }
          throw new Error('USD rate element not found');
        });
        
        console.log('Raw USD rate value:', rate);
        break;
      
    }
    if (rate && !isNaN(rate)) {
      await ExchangeRate.create({
        source: site.name,
        fromCurrency: site.name === 'europound' ? 'USD' : 'EUR', // Ajusta según el sitio
        toCurrency: site.name === 'europound' ? 'EUR' : 'USD',
        rate: parseFloat(rate)
      });
      
      console.log(`Saved rate for ${site.name}: ${rate}`);
    } else {
      throw new Error(`Invalid rate value: ${rate}`);
    }

    return rate;
  } catch (error) {
    console.error(`Error in scrapeExchangeRate for ${site.name}:`, error);
    throw error;
  } finally {
    await browser.close();
  }
}

async function scrapeAllSites() {
  const maxRetries = 3;
  
  for (const site of config.SITES) {
    let attempts = 0;
    while (attempts < maxRetries) {
      try {
        const rate = await scrapeExchangeRate(site);
        console.log(`Successfully scraped ${site.name} (attempt ${attempts + 1}): ${rate}`);
        break;
      } catch (error) {
        attempts++;
        console.error(`Error scraping ${site.name} (attempt ${attempts}):`, error);
        
        if (attempts === maxRetries) {
          console.error(`Failed to scrape ${site.name} after ${maxRetries} attempts`);
        } else {
          // Espera exponencial entre reintentos
          await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempts)));
        }
      }
    }
  }
}

module.exports = { scrapeAllSites };