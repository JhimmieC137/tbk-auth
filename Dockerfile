FROM node:20.15.0-alpine

RUN apk add --no-cache bash

RUN npm i -g @nestjs/cli typescript ts-node

COPY . ./

RUN npm install


RUN npm run build

CMD npm run start:prod
