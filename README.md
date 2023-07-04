# Amie Todo task

## Requirements

- Nodejs >=16
- docker - optional

## App setup

In order to run the app, some of the environment variables should be set. follow these steps to set them:

```
$ cp .env.example .env
```

Open `.env` and you will find all the needed environment variables. the environment variables are self explained. following are the needed variables

- `PORT` the port number the app will use to run. default is `3000`
- `APP_DB_URI` the postgres db uri. example `'postgres://postgres:123456@localhost:5432/amie'`

Then run the following commands

```
$ npm install
$ npm run prepare
```

## DB Setup

In order to run the app, the `postgresql` db should be run and the tables should be created. use the following command to run a local instance of `postgresql` locally

Note: make sure to update the APP_DB_URI variable in the `.env` to use the same password as you you use in the next command

```
$ docker run -p 5432:5432 --rm  --name some-postgres -e POSTGRES_PASSWORD=123456 postgres
```

next, run the following commands to create the tables

```
$ npx sequelize-cli db:create # skip this if the db is already created
$ npx sequelize-cli db:migrate
```

## How to start the app locally

To start the app, run the following

```
$ npm run gql:codegen
$ npm run start:dev
```

This will run the app on the defined PORT in the .env file

## Run test

```
$ npm test
```

## Features

- Typescript support
- gql API
- using Sequelize as ORM
  - using Sequelize-cli to handle the db migrations
- nodemon for local development
- Code formatting and linting using:
  - eslint
  - prettier
- pre-commit hooks using:
  - lint-staged
  - husky
- nodemon for local development
- using Jest for unit testing
