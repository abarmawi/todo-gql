# Amie Todo task

## Requirements

- Nodejs >=16

## App setup

In order to run the app, some of the environment variables should be set. follow these setups to setup them:

```
$ cp .env.example .env
```

Open `.env` and you will find all the needed environment variables. the environment variables are self explained, though i added a quick note next to each one.

The run the following

```
$ npm install
$ npm run prepare
```

## How to start the app locally

To start the app, run the following

```
$ npm run gql:codegen
$ npm run start:dev
```

This will run the app on the defined PORT env variable in the .env file

## Features

- Typescript support
- nodemon for local development
- Code formatting and linting using:
  - eslint
  - prettier
- pre-commit hooks using:
  - lint-staged
  - husky
