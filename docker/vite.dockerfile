# Use Node.js as builder to prevent vite issues w/ docker
FROM node:18 AS builder

# Set the working directory
WORKDIR /var/www/html

# Copy package.json and package-lock.json first for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port for Vite's dev server
EXPOSE 5173

# Start the Vite dev server
CMD ["npm", "run", "dev"]
