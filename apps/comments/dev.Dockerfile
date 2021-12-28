FROM node:14-alpine

WORKDIR /usr/app

RUN npm install -g nx

COPY ["package.json", "package-lock.json", "./"]

RUN npm ci

COPY [".eslintrc.json", "babel.config.json", "jest.config.js", "jest.preset.js", "nx.json", "tsconfig.base.json", "workspace.json", "./"]

COPY ./apps/blog/project.json ./apps/blog/project.json
COPY ./apps/blog-e2e/project.json ./apps/blog-e2e/project.json
COPY ./apps/comments/project.json ./apps/comments/project.json
COPY ./apps/event-bus/project.json ./apps/event-bus/project.json
COPY ./apps/moderation/project.json ./apps/moderation/project.json
COPY ./apps/posts/project.json ./apps/posts/project.json
COPY ./apps/query/project.json ./apps/query/project.json

COPY ./libs ./libs

COPY ./apps/comments ./apps/comments

ENV PORT=4001
EXPOSE ${PORT}

CMD ["nx", "run", "comments:serve", "--verbose"]
