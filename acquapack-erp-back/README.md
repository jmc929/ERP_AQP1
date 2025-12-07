## Backend - Acquapack ERP

Proyecto Node.js (TypeScript) con Express y arquitectura modular.

### Requisitos
- Node.js >= 18.17

### Instalación
```bash
cd acquapack-erp-back
npm install
npm run dev
```

### Scripts
- `npm run dev`: desarrollo con recarga
- `npm run build`: compila a `dist/`
- `npm start`: ejecuta build

### Variables de entorno
- `PORT` (por defecto `4000`)
- `NODE_ENV` (`development` | `production` | `test`, por defecto `development`)
- `CORS_ORIGIN` (por defecto `http://localhost:5173`, múltiples separados por comas)

Puedes crear un archivo `.env` en `acquapack-erp-back/` con:
```
PORT=4000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Endpoints
- `GET /api/health` → estado del servicio

### Estructura
```
acquapack-erp-back/
  src/
    common/
      middlewares/
    config/
    modules/
      health/
    routes/
    app.ts
    server.ts
```


