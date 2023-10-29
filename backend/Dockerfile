FROM node:21-alpine3.17
WORKDIR /app/backend
COPY package.* ./
RUN npm install
COPY . /app/backend/ 
WORKDIR /app/backend
CMD ["npm", "run", "start"]