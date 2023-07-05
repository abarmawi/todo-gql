# Todo task

## Intro

- This project use Apollo graphql to resolve the queriers and mutations
- It integrates with [mockapi](https://64a45145c3b509573b576466.mockapi.io/) as external Todo mock server.
  - you can browse all the todos [here](https://64a45145c3b509573b576466.mockapi.io/api/v1/todos)
  - After creating and updating a todo, it will be synced with this mock server
- The app doesn't provide authentication, but it has a hardcoded user id configured in `startStandaloneServer` [here](./src/index.ts)
- there are many ways to enhance the app as the following
  - Add authentication & authorization using JWT token
  - Add integration and APIs tests
  - and many other

## Requirements

- [Node.js>=16](https://nodejs.org/en/download/)
- docker - optional

## Quick run (super fast!)

If you want to run the App quickly without going through this README file, then follow these setups.
If you want more details and explanation, then better to read the section in this README file

```bash
$ echo PORT=3000\nAPP_DB_URI='postgres://postgres:123456@localhost:5432/todo'\nAPP_MOCK_TODO_SERVER=https://64a45145c3b509573b576466.mockapi.io/api/v1/todos > .env
$ docker run -p 5432:5432 --name some-postgres -e POSTGRES_PASSWORD=123456 -d postgres
$ npm install
$ npx sequelize-cli db:create
$ npx sequelize-cli db:migrate
$ npm run start:dev
# in a different terminal run
$ cd docs
$ npm start
# in a different terminal run
$ cd docs
$ npm start
```

The the app should run on [http://localhost:3000](http://localhost:3000)

## App setup

In order to run the app, some of the environment variables should be set. follow these steps to set them:

```bash
$ cp .env.example .env
```

Open `.env` and you will find all the needed environment variables. the environment variables are self explained. following are the needed variables

- `PORT` the port number the app will use to run. default is `3000`
- `APP_DB_URI` the postgres db uri. example `'postgres://postgres:123456@localhost:5432/todo'`
- `APP_MOCK_TODO_SERVER` the todo mock server. for this task, please use this value `'https://64a45145c3b509573b576466.mockapi.io/api/v1/todos'`

Then run the following commands

```bash
$ npm install
$ npm run prepare
```

## DB Setup

In order to run the app, the `postgresql` db should be run and the tables should be created. use the following command to run a local instance of `postgresql` locally

Note: make sure to update the APP_DB_URI variable in the `.env` to use the same password as you you use in the next command

```bash
$ docker run -p 5432:5432 --rm  --name some-postgres -e POSTGRES_PASSWORD=123456 postgres
```

next, run the following commands to create the tables

```bash
$ npx sequelize-cli db:create # skip this if the db is already created
$ npx sequelize-cli db:migrate
```

## How to start the app locally

To start the app, run the following

```bash
$ npm run gql:codegen
$ npm run start:dev
```

This will run the app on the defined PORT in the .env file

## Run test

```bash
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
- docusaurus for App documentation
