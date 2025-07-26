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

# Install bash and envsubst tools
RUN apk add --no-cache bash

# Copy runtime env injection script
COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
