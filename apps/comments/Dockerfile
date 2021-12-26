FROM node:16-alpine

WORKDIR /usr/app

COPY ./dist/apps/comments/package.json ./

RUN npm install --production
RUN npm install tslib

COPY ./dist/apps/comments ./

ENV PORT=4001
EXPOSE ${PORT}

USER node

CMD ["node", "./main.js"]
