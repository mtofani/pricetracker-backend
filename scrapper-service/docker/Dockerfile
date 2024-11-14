FROM mcr.microsoft.com/playwright:v1.47.2-focal

WORKDIR /app

# Copiar archivos de dependencias
COPY ../package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

ENV NODE_ENV=production

CMD ["npm", "start"]