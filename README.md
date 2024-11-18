# pricetracker-backend

**pricetracker -backend** es un conjunto de tres microservicios que proporcionan funcionalidades de autenticación, obtención de tasas de cambio(EUR/USD) en España y scraping de datos. El proyecto está desarrollado en JavaScript, usa MongoDB para almacenamiento, y Jest para pruebas unitarias. Además, cuenta con integración continua a través de GitHub Actions y se despliega utilizando Docker y Docker Compose.

## Microservicios

### 1. **Auth Service**
Este microservicio gestiona la autenticación de usuarios. Utiliza JWT para la autenticación y permite la gestión de usuarios mediante endpoints REST.

### 2. **Exchange Rate API**
Una API que proporciona datos actualizados sobre tasas de cambio de diferentes divisas. Los datos se obtienen de fuentes externas.

### 3. **Scraper**
Un microservicio dedicado a realizar scraping de datos desde diferentes sitios web para recopilar información relevante sobre tipos de cambio u otros datos financieros.

## Requisitos

- Node.js  (>= LTS 18)
- Docker
- Docker Compose

## Instalación

1. Clona este repositorio:
    ```bash
    git clone https://github.com/mtofani/priceTracker-backend.git
    ```

2. Accede al directorio del proyecto e instala las dependencias:
    ```bash
    npm install
    ```

3. Configura las variables de entorno necesarias:
    ## configuración de entorno

Copia el archivo `.envexample` a `.env` y configura las siguientes variables de entorno:

- `API_PORT`: puerto para la API de tasas de cambio (por defecto: `4000`).
- `AUTH_PORT`: puerto para el servicio de autenticación (por defecto: `3001`).
- `SCRAPPER_PORT`: puerto para el scraper (por defecto: `3002`).
- `MONGODB_URI`: URI de conexión a tu base de datos MongoDB (proporcionado en el archivo `.envexample`).
- `SCRAPE_INTERVAL`: intervalo para el scraping (por defecto: `*/15 * * * *` para cada 15 minutos).
- `NODE_ENV`: entorno de ejecución (por defecto: `development`).
## Uso

Puedes iniciar todos los microservicios utilizando Docker Compose:

```bash
docker-compose up
```

## Extender el scraper

Si deseas extender el scraper a más sitios web, sigue estos pasos:

1. **Modelos de Scraping**: Usa los modelos y clases existentes en el servicio `/services/scraper.js`.
    - Modifica `/services/scraper.js` para incluir la lógica de Playwright y así interactuar con páginas dinámicas.

