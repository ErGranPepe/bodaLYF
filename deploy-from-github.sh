#!/bin/bash

# Script para desplegar desde GitHub
echo "🚀 Desplegando bodaLYF desde GitHub..."

# Parar y eliminar contenedor actual
docker stop bodalyf-web-1
docker rm bodalyf-web-1

# Eliminar imagen anterior
docker rmi bodalyf-web:latest 2>/dev/null || true

# Clonar/actualizar repositorio
if [ -d "bodaLYF-deploy" ]; then
    cd bodaLYF-deploy
    git pull origin main
else
    git clone https://github.com/tu-usuario/bodaLYF.git bodaLYF-deploy
    cd bodaLYF-deploy
fi

# Construir nueva imagen
docker build -t bodalyf-web:latest .

# Ejecutar nuevo contenedor
docker run -d --name bodalyf-web-1 -p 3000:3000 bodalyf-web:latest

echo "✅ Despliegue desde GitHub completado"