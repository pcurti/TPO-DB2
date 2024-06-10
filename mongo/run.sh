#!/bin/bash

IMAGE_NAME="app"

if [[ "$(docker-compose images -q $SERVICE_NAME 2> /dev/null)" == "" ]]; then
  echo "La imagen para el servicio $SERVICE_NAME no está construida. Construyendo la imagen..."
  docker-compose build $SERVICE_NAME
else
  echo "La imagen para el servicio $SERVICE_NAME ya está construida."
fi

echo "Ejecutando el servicio $SERVICE_NAME..."
docker-compose up $SERVICE_NAME