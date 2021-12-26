FROM node:16-alpine

WORKDIR /usr/app

COPY ./dist/apps/moderation/package.json ./

RUN npm install --production
RUN npm install tslib

COPY ./dist/apps/moderation ./

ENV PORT=4003
EXPOSE ${PORT}

USER node

CMD ["node", "./main.js"]
