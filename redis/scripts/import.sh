#!/bin/bash

echo "====importing bataxi to redis===="

file_path="files/bataxi.csv"

echo "adding from file: $file_path"

while IFS=, read -r id_viaje_r id_taxista_r fecha_inicio fecha_fin duracion origen_viaje_x origen_viaje_y destino_viaje_x destino_viaje_y cantidad_pasajeros; do
    redis-cli geoadd bataxi $origen_viaje_x $origen_viaje_y $id_viaje_r >> /dev/null
done < "$file_path"
echo "rows inserted: $(redis-cli zcard bataxi)"