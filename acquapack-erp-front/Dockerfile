# Dockerfile del Frontend - Desarrollo
FROM node:18-alpine

WORKDIR /app

# Copiamos solo los package para instalar dependencias primero
COPY package*.json ./

# Instalamos las dependencias (npm ci es más rápido y confiable)
RUN npm ci

# Copiamos el resto del código
COPY . .

# Exponemos el puerto configurado en vite.config.ts (8080)
EXPOSE 8080

# Comando para desarrollo (Vite ya está configurado con host: "::" en vite.config.ts)
CMD ["npm", "run", "dev"]