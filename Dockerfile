# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev for build)
RUN npm install

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

# Copy only necessary files
COPY package*.json ./
COPY server.ts ./
COPY index.html ./

# Copy dist from builder stage
COPY --from=builder /app/dist ./dist

# Install only production dependencies
RUN npm ci --only=production

# Install tsx for running TypeScript files
RUN npm install tsx --save-prod

# Expose port
EXPOSE 3000

# Run the server
CMD ["npx", "tsx", "server.ts"]
