#!/bin/bash
echo "cleaning docker"
val=$(redis-cli DEL bataxi)
value=$(redis-cli EXISTS bataxi)
if [[ "$value" -eq 1 ]]; then
    echo "removing bataxi keyspace"
    if [[ "$val" -eq 1 ]]; then
        val=true
    else
        val=false
    fi
    echo "removed bataxi? $val"
fi
docker-compose -f compose.yaml down
echo "done"