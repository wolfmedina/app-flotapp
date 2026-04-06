# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install tzdata for timezone support
RUN apk add --no-cache tzdata

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Copy node_modules and build from builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/server.ts ./
COPY --from=builder /app/index.html ./

# Expose port
EXPOSE 3000

# Run the server
CMD ["node", "server.ts"]
