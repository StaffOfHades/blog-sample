FROM node:16-alpine

WORKDIR /usr/app

COPY ./dist/apps/posts/package.json ./

RUN npm install --production
RUN npm install tslib

COPY ./dist/apps/posts ./

ENV PORT=4000
EXPOSE ${PORT}

USER node

CMD ["node", "./main.js"]
