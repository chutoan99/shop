# Use a specific version of Node.js
FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install --f
COPY . .
CMD ["npm", "run", "dev"] 