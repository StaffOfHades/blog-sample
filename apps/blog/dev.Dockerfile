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

COPY ./apps/blog ./apps/blog

RUN touch ./apps/blog/proxy.conf.json
RUN echo "{}" > ./apps/blog/proxy.conf.json

ENV PORT=4200
EXPOSE ${PORT}

ARG publicHost=localhost
ENV PUBLIC_HOST=$publicHost

CMD ["sh", "-c", "nx run blog:serve --verbose --port=$PORT --host=0.0.0.0 --publicHost=$PUBLIC_HOST"]
