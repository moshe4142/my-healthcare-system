# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the application
COPY . .

# Expose Next.js default port
EXPOSE 3000

# Build the Next.js app
RUN npm run build

# Start the app
CMD ["npm", "start"]
