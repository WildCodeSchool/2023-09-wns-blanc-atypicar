FROM node:lts-alpine AS builder

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY tsconfig.json tsconfig.json
COPY src src
COPY uploads uploads


RUN npm i
RUN npm run build

FROM node:lts-alpine

WORKDIR /app

COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/package-lock.json /app/package-lock.json
COPY --from=builder /app/build /app
COPY --from=builder /app/tsconfig.json /app/tsconfig.json

RUN npm i --production

CMD npm start

