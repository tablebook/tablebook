
# Build stage gets deleted when build is done
FROM node:20-bookworm-slim AS build-stage

## Build client

WORKDIR /usr/src/app/client

COPY ./client/package*.json ./

RUN npm ci

COPY ./client/ ./

RUN npm run build


# Final image
FROM node:20-bookworm-slim

## Get client dist files from build stage

WORKDIR /usr/src/app/client

COPY --from=build-stage /usr/src/app/client/dist ./dist

## Get server and install server dependencies

WORKDIR /usr/src/app/server

COPY ./server/package*.json ./

RUN npm ci --omit=dev

COPY ./server/ ./

## Run server
CMD ["npm", "start"]
