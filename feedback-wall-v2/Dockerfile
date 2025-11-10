# Multi-stage build for combined frontend + backend

# Stage 1: Build frontend
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy frontend package files
COPY frontend/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy frontend source
COPY frontend/ ./

# Build frontend (API URL will be set at runtime via environment variable)
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL:-http://localhost:8080}

# Build React app
RUN npm run build

# Stage 2: Backend with frontend
FROM node:18-alpine

WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./

# Install backend dependencies
RUN npm install --only=production

# Copy backend code
COPY backend/server.js ./

# Copy built frontend from builder stage
COPY --from=frontend-builder /app/frontend/dist ./public

# Expose port
EXPOSE 8080

# Start the server
CMD ["node", "server.js"]

