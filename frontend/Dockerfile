FROM node:lts-alpine

WORKDIR /app

COPY package.json package.json
COPY tsconfig.json tsconfig.json

COPY next-env.d.ts next-env.d.ts
COPY next.config.js next.config.js
COPY postcss.config.js postcss.config.js 
COPY tailwind.config.js tailwind.config.js

RUN npm i

COPY src src

CMD npm start