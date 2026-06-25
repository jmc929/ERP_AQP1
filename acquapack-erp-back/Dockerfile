FROM node:22-alpine

WORKDIR /app

# Copiar package files e instalar dependencias (incluyendo devDeps para prisma generate)
COPY package*.json ./
RUN npm ci

# Copiar el código fuente (incluye prisma/schema.prisma)
COPY . .

# Generar el cliente Prisma dentro del contenedor
RUN npx prisma generate

# Eliminar devDependencies para imagen más liviana
RUN npm prune --omit=dev

ENV NODE_ENV=production
EXPOSE 4000

CMD ["npm", "start"]
