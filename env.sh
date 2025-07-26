#!/bin/sh
set -e

# Default to localhost if API_URL is not set
API_URL="${API_URL:-http://localhost:5050}"

echo "Injecting API_URL=$API_URL into built files..."

# Replace the placeholder __API_URL__ in JS/HTML files
find /usr/share/nginx/html -type f \( -name '*.js' -o -name '*.html' \) \
  -exec sed -i "s|__API_URL__|$API_URL|g" {} +

exec "$@"
