# Usa la imagen de node
FROM node:20-alpine


WORKDIR /app

COPY ../package*.json ./

RUN rm -rf node_modules
RUN npm cache clean --force
RUN npm ci



COPY ../ ./


CMD ["npm", "start"]
