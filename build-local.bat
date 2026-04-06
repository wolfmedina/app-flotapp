@echo off
REM Script para construir y desplegar la imagen localmente en Windows

echo === Construyendo imagen Docker localmente ===

REM Construir la imagen
docker build -t app-flotapp:latest .

echo.
echo === Imagen construida exitosamente ===
echo.
echo Para desplegar en Portainer:
echo 1. Copia el archivo docker-compose.yml al servidor
echo 2. En Portainer, ve a Stacks -> Add stack
echo 3. Selecciona 'File upload' y sube docker-compose.yml
echo 4. Configura las variables de entorno
echo 5. Deploy
echo.
echo Comandos útiles:
echo   docker run -d --name app-flotapp -p 8347:3000 app-flotapp:latest
echo   docker logs app-flotapp
echo   docker-compose up -d

pause
