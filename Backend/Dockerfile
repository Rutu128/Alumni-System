FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies inside the container
RUN npm install

# Copy the application code
COPY . .

# Expose the application port
EXPOSE 8000

# Start the application
CMD ["npm", "start"]
