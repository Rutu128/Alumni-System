# Use a Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the Vite development server port
EXPOSE 5173

# Start the Vite development server
CMD ["npm", "run", "dev"]
