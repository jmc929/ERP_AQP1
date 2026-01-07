# Usamos una imagen ligera de Node
FROM node:18-alpine

# Creamos la carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de dependencias primero (para aprovechar el caché)
COPY package*.json ./

# Instalamos las dependencias (npm ci es más rápido y confiable que npm install)
RUN npm ci

# Copiamos el resto del código
COPY . .

# Exponemos el puerto (asegúrate que sea el mismo que usa tu index.js, ej: 3000 o 4000)
EXPOSE 4000

# Comando para iniciar
CMD ["npm", "start"]