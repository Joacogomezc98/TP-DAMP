FROM node:20

WORKDIR /src/Frontend

COPY package*.json ./

RUN npm install -g @ionic/cli @angular-devkit/build-angular && npm install

EXPOSE 8100