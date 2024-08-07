FROM node:lts-alpine AS builder

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY tsconfig.json tsconfig.json
COPY migrations migrations
COPY jest.config.js jest.config.js
COPY src src

RUN npm i
RUN npm run build

FROM node:lts-alpine

WORKDIR /app

COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/package-lock.json /app/package-lock.json
COPY --from=builder /app/build /app

RUN npm i --production

CMD npx typeorm migration:run -d ./src/config/db.js ; npm start