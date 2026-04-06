# Guía de Despliegue con Portainer

## Error Común y Solución

Si encuentras el error:
```
failed to list workers: Unavailable: connection error: desc = "error reading server preface: http2: failed reading the frame payload: http2: frame too large"
```

**Solución**: Usa `docker-compose.simple.yml` en lugar de `docker-compose.yml`.

## Paso 1: Crear archivo .env

Crea un archivo `.env` en la raíz del proyecto:

```env
GEMINI_API_KEY=tu-clave-aqui
HOST_PORT=8347
```

## Paso 2: Desplegar en Portainer

### Opción A: Usando docker-compose.simple.yml (Recomendado)

1. En Portainer, ve a **Stacks** → **Add stack**
2. Selecciona **Web editor**
3. Copia el contenido de `docker-compose.simple.yml`
4. Configura las variables de entorno en Portainer
5. Haz click en **Deploy the stack**

### Opción B: Usando CLI (si tienes acceso)

```bash
# Construir la imagen
docker build -t app-flotapp .

# Ejecutar el contenedor
docker run -d \
  --name app-flotapp \
  -p 8347:3000 \
  -e GEMINI_API_KEY=tu-clave-aqui \
  -e NODE_ENV=production \
  app-flotapp
```

## Paso 3: Verificar el despliegue

```bash
# Ver logs
docker logs app-flotapp

# Verificar salud
curl http://localhost:8347/api/health
```

## Solución de Problemas

### Error: "context deadline exceeded"
- Aumenta el timeout en Portainer
- Reduce el tamaño del build context

### Error: "permission denied"
- Verifica que el Docker daemon tenga permisos
- Revisa las reglas de SELinux/AppArmor

### Error: "port already allocated"
- Cambia el puerto en el archivo `.env`
- Verifica qué proceso usa el puerto: `netstat -ano | findstr :8347`
