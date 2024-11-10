# Usa la imagen de node
FROM node:20-alpine

# Establece el directorio de trabajo en /app dentro del contenedor
WORKDIR /app

# Copia el package.json y package-lock.json desde el directorio superior
COPY ../package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código del proyecto (desde el directorio superior)
COPY ../ ./

# Exponer el puerto si es necesario
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
