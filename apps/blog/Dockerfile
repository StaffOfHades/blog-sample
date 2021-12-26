FROM node:16-alpine

WORKDIR /usr/app

RUN npm install serve

COPY ./dist/apps/blog ./

ENV PORT=4200
EXPOSE ${PORT}

USER node

CMD ["npx", "serve", "-l", "$PORT"]
