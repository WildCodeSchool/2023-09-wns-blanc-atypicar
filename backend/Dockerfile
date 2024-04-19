FROM node:lts-alpine

WORKDIR /app

COPY package.json package.json
COPY tsconfig.json tsconfig.json
COPY jest.config.js jest.config.js

RUN npm i

COPY src src

CMD npm run dev