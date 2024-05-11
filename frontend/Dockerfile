FROM node:20-slim

WORKDIR /frontend

COPY package*.json /frontend

RUN npm install

CMD ["npm", "run", "dev", "--port", "8080"]
