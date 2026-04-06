#!/bin/bash

# Script para exportar la imagen Docker como archivo
# Este archivo puede ser copiado al servidor y luego importado

set -e

echo "=== Exportando imagen Docker ==="

# Construir la imagen si no existe
if ! docker images app-flotapp:latest --format "{{.Repository}}" | grep -q app-flotapp; then
    echo "Construyendo imagen..."
    docker build -t app-flotapp:latest .
fi

# Exportar la imagen como archivo
OUTPUT_FILE="app-flotapp-image-$(date +%Y%m%d-%H%M%S).tar"
docker save app-flotapp:latest -o "$OUTPUT_FILE"

echo ""
echo "=== Imagen exportada exitosamente ==="
echo "Archivo: $OUTPUT_FILE"
echo ""
echo "Tamaño del archivo:"
ls -lh "$OUTPUT_FILE"
echo ""
echo "Para importar en el servidor con Portainer:"
echo "1. Copia el archivo $OUTPUT_FILE al servidor"
echo "2. En el servidor, ejecuta: docker load -i app-flotapp-image-*.tar"
echo "3. Luego crea el stack en Portainer usando docker-compose.yml (sin build)"
echo ""
echo "O usa este comando para importar directamente:"
echo "  docker load < $OUTPUT_FILE"
