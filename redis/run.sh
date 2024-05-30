#!/bin/bash

echo "Starting redis: "
echo "Adjusting permissions: "
sudo chmod +x -R scripts
echo "starting docker: "
docker-compose -f compose.yaml up -d
echo "running scripts:"
scripts/import.sh
scripts/geosearch.sh
scripts/members.sh
scripts/keys.sh

if [[ "$1" == "clean" ]];
then
    scripts/clean_docker.sh
fi