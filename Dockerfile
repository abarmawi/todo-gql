# Build image
FROM node:16-alpine as build

WORKDIR /usr/app

COPY . .

RUN ls

RUN npm install
RUN npm run gql:codegen -w backend-gql
RUN npm run build -w backend-gql

# # Run image
FROM node:16-alpine

WORKDIR /usr/app

COPY --from=build /usr/app/dist/src/. packages/backend-gql/src
COPY --from=build /usr/app/packages/backend-gql/package.json packages/backend-gql/package.json
COPY package.json .
RUN npm install

CMD ["npm", "run", "start:prod", "-w", "backend-gql"]