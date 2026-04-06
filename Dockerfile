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
COPY dist ./dist

# Install only production dependencies
RUN npm ci --only=production

# Expose port
EXPOSE 3000

# Run the server
CMD ["node", "server.ts"]
