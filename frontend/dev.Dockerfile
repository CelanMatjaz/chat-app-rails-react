FROM node:22-alpine3.18

WORKDIR /frontend

COPY package*.json /frontend

RUN apk add vim neovim

RUN npm install

COPY . /frontend

RUN chown -R node:node /frontend

CMD ["yarn", "dev"]
