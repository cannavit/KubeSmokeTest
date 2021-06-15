# Smoke-Master. 
# Project for create automatic smoke-testing suites. 
FROM node:14.4.0-alpine
# FROM node:14.4.0
WORKDIR /tmp
# Install uitls
RUN apk update
RUN apk add curl

# Install kubeclt
RUN  /usr/bin/curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl \
    && chmod +x ./kubectl  \
    &&  mv ./kubectl /usr/local/bin/kubectl 

# Directory by config certify. 
RUN mkdir -p /etc/deploy
# Copy Project
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
RUN npm link
