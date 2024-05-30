#!/bin/bash
places_path="files/places.csv"


echo "====Amount of trips per place: ===="

while IFS=, read -r member lon lat; do
    echo "From place: $member"
    redis-cli geosearch bataxi FROMLONLAT $lon $lat BYRADIUS 1 km | wc -l
done < "$places_path"