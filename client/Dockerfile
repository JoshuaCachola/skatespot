FROM node:15.12.0-buster

RUN mkdir -p /usr/src/app && chown -R node:node /usr/src/app

# set working directory
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json .

RUN npm i --legacy-peer-deps
RUN npm install react-scripts@4.0.0 -g --silent

# start app
CMD ["npm", "start"]
