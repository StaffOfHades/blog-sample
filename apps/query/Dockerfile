FROM node:16-alpine

WORKDIR /usr/app

COPY ./dist/apps/query/package.json ./

RUN npm install --production
RUN npm install tslib

COPY ./dist/apps/query ./

ENV PORT=4002
EXPOSE ${PORT}

USER node

CMD ["node", "./main.js"]
