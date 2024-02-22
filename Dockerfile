FROM node:18-alpine
WORKDIR /app

COPY ./src /app/src
COPY ./public /app/public

COPY ./package*.json /app
COPY ./vue.config.js /app
COPY ./babel.config.js /app
COPY ./jsconfig.json /app

RUN npm install

EXPOSE 3005

CMD ["npm", "run", "serve"]
