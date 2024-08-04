# Use the official Node.js image as a base image
FROM node:18-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock files to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that Vite uses
EXPOSE 3000

# Run the Vite development server
CMD ["yarn", "dev"]
