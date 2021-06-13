FROM node:14.4.0-alpine

WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN npm install
RUN apk update
RUN apk add curl
RUN npm link
