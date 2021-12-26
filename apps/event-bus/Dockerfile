FROM node:16-alpine

WORKDIR /usr/app

COPY ./dist/apps/event-bus/package.json ./

RUN npm install --production
RUN npm install tslib

COPY ./dist/apps/event-bus ./

ENV PORT=4005
EXPOSE ${PORT}

USER node

CMD ["node", "./main.js"]
