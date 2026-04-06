# Guía de Despliegue para Portainer - Solución al Error HTTP/2

## El Problema

El error:
```
failed to list workers: Unavailable: connection error: desc = "error reading server preface: http2: failed reading the frame payload: http2: frame too large"
```

Esto es un problema conocido con Portainer cuando intenta hacer el build del Dockerfile. El problema es que Portainer usa un motor de build que tiene limitaciones.

## Solución: Build Local + Deploy en Portainer

### Paso 1: Construir la imagen localmente

#### En Windows:
```cmd
cd C:\Users\oband\Downloads\app-flotapp
build-local.bat
```

#### En Linux/Mac:
```bash
cd /path/to/app-flotapp
chmod +x build-local.sh
./build-local.sh
```

#### O manualmente:
```bash
docker build -t app-flotapp:latest .
```

### Paso 2: Verificar la imagen local

```bash
docker images | grep app-flotapp
```

Deberías ver algo como:
```
app-flotapp    latest    abc123def456    2 minutes ago    150MB
```

### Paso 3: Desplegar en Portainer (Sin build)

1. En Portainer, ve a **Stacks** → **Add stack**

2. Selecciona **Web editor** o **File upload**

3. Usa este contenido mínimo (sin build):

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

**Nota importante**: ¡No incluyas la sección `build:` en el docker-compose.yml para Portainer!

4. Configura tu `GEMINI_API_KEY`

5. Haz click en **Deploy the stack**

### Paso 4: Verificar

```bash
# Verificar que el contenedor esté corriendo
docker ps | grep app-flotapp

# Ver logs
docker logs -f app-flotapp

# Probar la API
curl http://localhost:8347/api/health
```

## Solución Alternativa: Subir a Registry

Si prefieres usar un registry (Docker Hub, registry local, etc.):

### 1. Taggear la imagen
```bash
docker tag app-flotapp:latest tu-usuario/app-flotapp:latest
```

### 2. Subir al registry
```bash
docker push tu-usuario/app-flotapp:latest
```

### 3. Usar en Portainer
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

## Verificación del Despliegue

Después del deploy, verifica:

```bash
# Contenedor corriendo
docker ps

# Logs
docker logs app-flotapp

# Health check
curl http://localhost:8347/api/health
# Debería devolver: {"status":"ok"}
```

## Solución de Problemas

### Error: "image not found"
- Asegúrate de haber construido la imagen localmente primero
- Verifica con `docker images`

### Error: "port already in use"
- Cambia el puerto en el docker-compose.yml
- Verifica qué usa el puerto: `netstat -ano | findstr :8347`

### Error: "GEMINI_API_KEY not set"
- Configura la variable de entorno en Portainer
- O edita el docker-compose.yml y pon tu clave directamente
