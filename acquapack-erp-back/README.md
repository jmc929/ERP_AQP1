## Backend - Acquapack ERP

Proyecto Node.js con Express y arquitectura modular.

### Requisitos
- Node.js >= 18.17
- PostgreSQL (base de datos)

### Instalación
```bash
cd acquapack-erp-back
npm install
npm run dev
```

### Scripts
- `npm run dev`: desarrollo con recarga
- `npm start`: ejecuta el servidor

### Variables de entorno

**⚠️ IMPORTANTE:** El archivo `.env` NO se sube a GitHub (está en `.gitignore`). 

Para configurar tu entorno:

1. **Copia el archivo de ejemplo:**
   ```bash
   cp .env.example .env
   ```

2. **Edita el archivo `.env`** con tus valores reales:
   ```env
   PORT=4000
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:5173
   
   # Configuración de la base de datos PostgreSQL
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=acquapack_erp
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   ```

**Variables disponibles:**
- `PORT` (por defecto `4000`)
- `NODE_ENV` (`development` | `production` | `test`, por defecto `development`)
- `CORS_ORIGIN` (por defecto `http://localhost:5173`, múltiples separados por comas)
- `DB_HOST` (por defecto `localhost`)
- `DB_PORT` (por defecto `5432`)
- `DB_NAME` (por defecto `acquapack_erp`)
- `DB_USER` (por defecto `postgres`)
- `DB_PASSWORD` (requerido, sin valor por defecto)

### Base de Datos

El proyecto usa PostgreSQL. La conexión se establece automáticamente al iniciar el servidor.

**Configuración:**
- El pool de conexiones se crea en `src/config/db.js`
- Se prueba la conexión al iniciar el servidor
- Si la conexión falla, el servidor se inicia de todas formas (con advertencia)

**Verificar conexión:**
- `GET /api/health` → estado del servicio y base de datos
- `GET /api/health/db` → información detallada de la conexión a la base de datos

### Endpoints
- `GET /api/health` → estado del servicio y conexión a la base de datos
- `GET /api/health/db` → información detallada de la conexión a PostgreSQL

### Estructura
```
acquapack-erp-back/
  src/
    common/
      middlewares/
    config/
      env.js      (configuración de variables de entorno)
      db.js       (configuración de conexión a PostgreSQL)
    modules/
      health/
      compras/
    routes/
    app.js
    server.js
  .env.example  (plantilla de variables de entorno)
  .env          (tu archivo local - NO se sube a GitHub)
```


