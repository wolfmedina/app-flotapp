@echo off
REM Script para importar la imagen Docker desde un archivo
REM Usado después de copiar el archivo .tar al servidor

echo === Importando imagen Docker ===

if "%~1"=="" (
    REM Buscar el último archivo .tar
    for /f "delims=" %%i in ('dir /b /od app-flotapp-image-*.tar 2^>nul ^| findstr /c:"app-flotapp-image-" ^| more +1') do set "FILE=%%i"
    if "%FILE%"=="" (
        echo Error: No se encontró ningún archivo .tar
        echo Uso: import-image.bat nombre-del-archivo.tar
        pause
        exit /b 1
    )
    set "FILE=%FILE%"
) else (
    set "FILE=%~1"
)

if not exist "%FILE%" (
    echo Error: Archivo '%FILE%' no encontrado
    pause
    exit /b 1
)

echo Importando %FILE%...
docker load -i "%FILE%"

echo.
echo === Imagen importada exitosamente ===
docker images app-flotapp:latest
echo.
echo Ahora puedes desplegar con:
echo   docker-compose up -d

pause
