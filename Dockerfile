# Build stage
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all files
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install serve
RUN npm install -g serve

# Copy built assets from the build stage
COPY --from=build /app/build .

# Expose port 8080
EXPOSE 8080

# Start the app
CMD ["serve", "-s", ".", "-l", "8080"]