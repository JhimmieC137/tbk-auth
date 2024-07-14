FROM node:20.15.0-alpine

RUN apk add --no-cache bash

RUN npm i -g @nestjs/cli typescript ts-node

COPY package*.json /tmp/app/

RUN cd /tmp/app && npm install

COPY . /usr/src/app

RUN cp -a /tmp/app/node_modules /usr/src/app

WORKDIR /usr/src/app

RUN npm run build

CMD [" npm run start:prod "]
