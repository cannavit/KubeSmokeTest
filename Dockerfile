# Smoke-Master. 
# Project for create automatic smoke-testing suites. 
FROM node:15.8.0-alpine
# FROM node:14.4.0
WORKDIR /tmp

ARG KUBERNETES_TOKEN
ENV KUBERNETES_TOKEN=$KUBERNETES_TOKEN

RUN echo $KUBERNETES_TOKEN
# Install uitls and install kubectl
RUN apk update \
    && apk add curl \
    && apk add util-linux \
    && /usr/bin/curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl \
    && chmod +x ./kubectl  \
    &&  mv ./kubectl /usr/local/bin/kubectl 

# Directory by config certify. 
RUN mkdir -p /etc/deploy && mkdir -p /usr/src/app
RUN echo $KUBERNETES_TOKEN | base64 -d > /etc/deploy/config
# Directory by config certify. 
RUN mkdir -p $HOME/.kube/
RUN echo $KUBERNETES_TOKEN | base64 -d > $HOME/.kube/config


RUN kubectl config view

WORKDIR /usr/src/app
# COPY . /usr/src/appclear

# RUN npm install  #? old
# RUN npm install shelljs #? old
RUN npm init --yes
RUN npm set-script smoke-test "jest"
RUN npm i jest smktest-utils \
    && npm i create-smktest smktest-utils -g 

# RUN npm link

# Genrerate automatic test 
RUN create-smktest --cluster-coverage

CMD npm run smoke-test


