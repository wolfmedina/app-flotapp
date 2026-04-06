@echo off
REM Script para exportar la imagen Docker como archivo
REM Este archivo puede ser copiado al servidor y luego importado

echo === Exportando imagen Docker ===

REM Construir la imagen si no existe
docker images app-flotapp:latest --format "{{.Repository}}" | findstr app-flotapp >nul
if %errorlevel% neq 0 (
    echo Construyendo imagen...
    docker build -t app-flotapp:latest .
)

REM Exportar la imagen como archivo
set TIMESTAMP=%date:~-4%%date:~3,2%%date:~0,2%-%time:~0,2%%time:~3,2%%time:~6,2%
set TIMESTAMP=%TIMESTAMP: =0%
set OUTPUT_FILE=app-flotapp-image-%TIMESTAMP%.tar

docker save app-flotapp:latest -o "%OUTPUT_FILE%"

echo.
echo === Imagen exportada exitosamente ===
echo Archivo: %OUTPUT_FILE%
echo.
echo Tamaño del archivo:
dir /h %OUTPUT_FILE%
echo.
echo Para importar en el servidor con Portainer:
echo 1. Copia el archivo %OUTPUT_FILE% al servidor
echo 2. En el servidor, ejecuta: docker load -i app-flotapp-image-*.tar
echo 3. Luego crea el stack en Portainer usando docker-compose.yml (sin build)
echo.
echo O usa este comando para importar directamente:
echo   docker load ^< %OUTPUT_FILE%

pause
