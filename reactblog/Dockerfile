# Use Node.js 18 as the base image
FROM node:18

# Set environment variable to disable source maps
ENV GENERATE_SOURCEMAP=false

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Install serve to serve the built app
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Serve the app
CMD ["serve", "-s", "build", "-l", "3000"]
