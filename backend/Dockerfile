FROM node:18-alpine

WORKDIR /app

# Copy package files first
COPY package.json ./

# Install dependencies
RUN npm install --only=production

# Copy application code
COPY server.js ./

# Expose port
EXPOSE 8080

# Start the server
CMD ["node", "server.js"]

