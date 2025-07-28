#!/bin/sh
set -e

API_URL="${API_URL:-http://localhost:5050}"
echo "Injecting API_URL=$API_URL into runtime-env.js..."

sed -i "s|__API_URL__|$API_URL|g" /usr/share/nginx/html/runtime-env.js

exec "$@"
