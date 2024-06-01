#!/bin/bash

echo "starting docker: "
docker-compose -f compose.yaml up -d
echo "executing main.py"
python scripts/main.py
echo "stopping docker: "
docker-compose -f compose.yaml down