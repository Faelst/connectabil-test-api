# Base image
FROM node:16.18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN rm -rf env/local.env

RUN npm run build

CMD [ "node", "dist/main.js" ]