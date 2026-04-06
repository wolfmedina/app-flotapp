# Guía de Despliegue con Portainer - Solución Definitiva

## El Problema

El error:
```
failed to list workers: Unavailable: connection error: desc = "error reading server preface: http2: failed reading the frame payload: http2: frame too large"
```

Esto es un problema conocido con Portainer cuando intenta hacer el `docker build` desde el web UI.

## Solución: Exportar e Importar la Imagen

### Paso 1: Exportar la imagen desde tu máquina

#### En Windows:
```cmd
cd C:\Users\oband\Downloads\app-flotapp
export-image.bat
```

Esto creará un archivo como `app-flotapp-image-20260406-143025.tar`

#### En Linux/Mac:
```bash
cd /path/to/app-flotapp
chmod +x export-image.sh
./export-image.sh
```

### Paso 2: Copiar el archivo .tar al servidor

Copia el archivo `.tar` al servidor donde tienes Portainer instalado.

### Paso 3: Importar la imagen en el servidor

#### En Windows (si el servidor es Windows):
```cmd
import-image.bat app-flotapp-image-*.tar
```

#### En Linux/Mac (si el servidor es Linux/Mac):
```bash
chmod +x import-image.sh
./import-image.sh app-flotapp-image-*.tar
```

### Paso 4: Desplegar en Portainer

1. En Portainer, ve a **Stacks** → **Add stack**

2. Usa este contenido (¡sin sección `build:`!):

```yaml
version: '3.8'

services:
  app-flotapp:
    image: app-flotapp:latest
    container_name: app-flotapp
    ports:
      - "8347:3000"
    environment:
      - NODE_ENV=production
      - GEMINI_API_KEY=tu-clave-aqui
    restart: unless-stopped
```

3. Configura tu `GEMINI_API_KEY`

4. Haz click en **Deploy the stack**

### Paso 5: Verificar

```bash
docker ps | grep app-flotapp
docker logs app-flotapp
curl http://localhost:8347/api/health
```

## Alternativa: Usar Docker Hub

Si prefieres usar un registry:

### 1. Subir tu imagen a Docker Hub:
```bash
docker tag app-flotapp:latest tu-usuario/app-flotapp:latest
docker push tu-usuario/app-flotapp:latest
```

### 2. En Portainer, usar este docker-compose.yml:
```yaml
version: '3.8'

services:
  app-flotapp:
    image: tu-usuario/app-flotapp:latest
    container_name: app-flotapp
    ports:
      - "8347:3000"
    environment:
      - NODE_ENV=production
      - GEMINI_API_KEY=tu-clave-aqui
    restart: unless-stopped
```

## Resumen de Archivos

| Archivo | Descripción |
|---------|-------------|
| `Dockerfile` | Definición de la imagen |
| `docker-compose.yml` | Despliegue (sin build) |
| `export-image.bat` | Exportar imagen (Windows) |
| `export-image.sh` | Exportar imagen (Linux/Mac) |
| `import-image.bat` | Importar imagen (Windows) |
| `import-image.sh` | Importar imagen (Linux/Mac) |

## Solución de Problemas

### Error: "image not found"
- Asegúrate de haber importado la imagen primero
- Verifica con: `docker images | grep app-flotapp`

### Error: "port already in use"
- Cambia el puerto en el docker-compose.yml
- Verifica qué usa el puerto: `netstat -ano | findstr :8347`

### Error: "GEMINI_API_KEY not set"
- Configura la variable de entorno en Portainer
- O edita el docker-compose.yml y pon tu clave directamente
