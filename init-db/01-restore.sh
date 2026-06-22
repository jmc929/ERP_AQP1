#!/bin/bash
set -e

echo "=== Restaurando cloud_backup.sql en la base de datos $POSTGRES_DB ==="

# Filtrar 'SET transaction_timeout' que no existe en PG < 17
# El archivo está montado en /backup/ (fuera de initdb.d para que Docker no lo ejecute directamente)
sed '/^SET transaction_timeout/d' /backup/cloud_backup.sql \
  | psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" --set ON_ERROR_STOP=off

echo "=== Restauración de cloud_backup.sql completada ==="
