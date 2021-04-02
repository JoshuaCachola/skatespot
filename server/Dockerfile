FROM node:15.12.0-buster

RUN mkdir -p /usr/src/app && chown -R node:node /usr/src/app

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

RUN apt-get update \
  && apt-get -y install netcat gcc postgresql \
  && apt-get clean

COPY package.json .

RUN npm install

COPY . .
COPY entrypoint.sh .

RUN chmod +x /usr/src/app/entrypoint.sh
