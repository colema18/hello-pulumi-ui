# Stage 1: Build React app
FROM node:18-alpine AS build
WORKDIR /app

# Copy dependencies first for caching
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx and runtime API URL injection
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Copy built files
COPY --from=build /app/build ./

# Install required tools for runtime replacement
RUN apk add --no-cache bash grep sed

# Copy runtime env injection script
COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh

# Optional: Custom Nginx config (if you have one)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
