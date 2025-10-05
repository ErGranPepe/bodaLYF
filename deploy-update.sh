#!/bin/bash

# Script para actualizar la web en el servidor
echo "🚀 Actualizando bodaLYF en el servidor..."

# Construir nueva imagen
docker build -t bodalyf-web:latest .

# Parar y eliminar contenedor actual
docker stop bodalyf-web-1
docker rm bodalyf-web-1

# Ejecutar nuevo contenedor
docker run -d --name bodalyf-web-1 -p 3000:3000 bodalyf-web:latest

echo "✅ Despliegue completado. La web está disponible en el puerto 3000"