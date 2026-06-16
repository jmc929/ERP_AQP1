# Acquapack ERP

Este es el sistema ERP de Acquapack, compuesto por un frontend en React (construido con Vite) y un backend en Node.js/Express con base de datos PostgreSQL.

---

## 📁 Estructura del Proyecto

*   **`acquapack-erp-front/`**: Aplicación web frontend en React + Vite + TailwindCSS.
*   **`acquapack-erp-back/`**: API REST backend construida con Node.js, Express y PostgreSQL (pg pool).
*   **`docker-compose.yml`**: Configuración de Docker Compose para entorno de desarrollo local.
*   **`docker-compose.prod.yml`**: Configuración de Docker Compose optimizada para el servidor de producción.
*   **`cloud_backup.sql`**: Respaldo completo de la base de datos de producción (estructura y datos reales).

---

## ⚙️ Configuración de Variables de Entorno (`.env`)

El proyecto maneja distintos archivos de variables de entorno para separar el desarrollo local de la producción.

### A. Para Desarrollo Local (`npm run dev`)
En la carpeta `acquapack-erp-back/` se leen los siguientes archivos:
1.  **`.env`** *(Rastreado en Git)*: Contiene la configuración por defecto para conectarse a la base de datos de la nube mediante Tailscale (`100.77.172.10`).
2.  **`.env.local`** *(Ignorado en Git)*: Este archivo lo usas para sobrescribir las credenciales y conectarte a tu base de datos PostgreSQL local en tu máquina.
    *   **Contenido de `acquapack-erp-back/.env.local`:**
        ```env
        DB_HOST=localhost
        DB_PORT=5432
        DB_NAME=ERP_ACQ
        DB_USER=postgres
        DB_PASSWORD=root
        
        ```

### B. Para Docker Compose (Local)
En la carpeta raíz del proyecto se utiliza el archivo **`.env`** *(Ignorado en Git)*:
*   Si deseas que Docker se conecte al PostgreSQL de tu Windows local, configúralo de la siguiente manera:
    ```env
    DB_HOST=host.docker.internal
    DB_PORT=5432
    DB_NAME=ERP_ACQ
    DB_USER=postgres
    DB_PASSWORD=root
    CORS_ORIGIN=http://localhost:8081
    VITE_API_URL=http://localhost:4000
    ```

---

## 💾 Restauración de la Base de Datos Local

Si deseas montar la base de datos de producción localmente para pruebas, utiliza el archivo `cloud_backup.sql`.

1.  Abre pgAdmin y crea una base de datos vacía llamada `ERP_ACQ`.
2.  Abre tu terminal en la carpeta raíz del proyecto (`Erp/`) y ejecuta:
    ```powershell
    # 1. Configura la contraseña de tu PostgreSQL local temporalmente
    $env:PGPASSWORD="TU_CONTRASEÑA_LOCAL"

    # 2. Ejecuta psql para importar el archivo
    psql -h localhost -U postgres -d ERP_ACQ -f cloud_backup.sql
    ```

---

## 🚀 Cómo Iniciar el Proyecto

### Opción 1: Desarrollo Local (Recomendado para programar)

Esta opción ejecuta el código directamente en tu sistema usando Node.js.

1.  **Detén cualquier contenedor de Docker** que esté ocupando puertos.
2.  **Iniciar el Backend:**
    ```bash
    cd acquapack-erp-back
    npm install
    npm run dev
    ```
    *   **¿Dónde se ejecuta?** El API estará disponible en: `http://localhost:4000`
3.  **Iniciar el Frontend:**
    *   Abre otra terminal y ejecuta:
    ```bash
    cd acquapack-erp-front
    npm install
    npm run dev
    ```
    *   **¿Dónde abrirlo?** Abre en tu navegador: **`http://localhost:8080`**

---

### Opción 2: Con Docker Compose (Local)

Esta opción ejecuta todo el proyecto dentro de contenedores aislados en tu máquina.

1.  **Asegúrate de que Docker Desktop esté encendido.**
2.  Si vas a conectar Docker a tu base de datos local de Windows (`host.docker.internal`), **tu Postgres de Windows debe estar activo**. Si quieres usar la BD dentro de Docker, cambia en el `.env` raíz `DB_HOST=postgres` y apaga el Postgres de Windows para liberar el puerto `5432`.
3.  Levanta los contenedores compilando los cambios:
    ```bash
    docker-compose up --build
    ```
4.  **¿Dónde abrirlo?**
    *   **Frontend web:** **`http://localhost:8081`**
    *   **Backend API:** `http://localhost:4000`

---

### Opción 3: Despliegue en el Servidor (Producción)

Esta opción se ejecuta únicamente en el servidor remoto para producción.

1.  Usa el archivo de producción diseñado para aislamiento completo:
    ```bash
    docker-compose -f docker-compose.prod.yml up -d --build
    ```
2.  En este modo, la base de datos corre internamente en el contenedor `postgres` (`DB_HOST=postgres`), los puertos del backend están protegidos del exterior y el frontend se sirve optimizado en el puerto `80`.
