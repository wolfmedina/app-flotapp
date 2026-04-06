#!/bin/bash

# Script para importar la imagen Docker desde un archivo
# Usado después de copiar el archivo .tar al servidor

set -e

echo "=== Importando imagen Docker ==="

if [ -z "$1" ]; then
    # Buscar el último archivo .tar
    LATEST=$(ls -t app-flotapp-image-*.tar 2>/dev/null | head -1)
    if [ -z "$LATEST" ]; then
        echo "Error: No se encontró ningún archivo .tar"
        echo "Uso: ./import-image.sh nombre-del-archivo.tar"
        exit 1
    fi
    FILE="$LATEST"
else
    FILE="$1"
fi

if [ ! -f "$FILE" ]; then
    echo "Error: Archivo '$FILE' no encontrado"
    exit 1
fi

echo "Importando $FILE..."
docker load -i "$FILE"

echo ""
echo "=== Imagen importada exitosamente ==="
docker images app-flotapp:latest
echo ""
echo "Ahora puedes desplegar con:"
echo "  docker-compose up -d"
