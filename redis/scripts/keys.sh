#!/bin/bash

value=$(redis-cli info keyspace | tail -n 1 | grep -o 'keys=[^,]*' | cut -d'=' -f2)

echo "====amount of keys in redis ===="
echo "keys=$value"