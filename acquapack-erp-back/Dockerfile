FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

ENV NODE_ENV=production
EXPOSE 4000

# Si tu backend usa TypeScript/Nest y requiere build:
# RUN npm run build
# CMD ["npm","run","start:prod"]

CMD ["npm","start"]
