# Nest.js Starter Boilerplate using TypeScript and TypeORM

## Features

* Swagger API Documentation 
* Code Style
    * ESLint with Prettier configuration
* CI/CD
    * Github Actions 
        * Build
        * Deploy DEV
        * Deploy PROD
    * PM2 integration
    * Environment Configuration
    * Pre-Commit
        * Run lint
        * Run test
* Built-in modules
    * LoggerModule
        * Custom Logger implementation including also the TypeORM part
        * Used Winston logger for dividing the logging into files by levels
    * AuthModule
    * UserModule
    * RoleModule
    * AttachmentModule
        * Upload file capability
* Global Built-in DTOs
    * DefaultResponseDTO
    * FailedResponseDTO
* Error Handling
    * BadRequestExceptionFilter
    * HttpExceptionFilter
    * ValidationExceptionFilter
    * QueryFailedExceptionFilter
        * Handling PostgreSQL custom error codes
* Unit Test Examples
    * user.controller.spec.ts
* Auth:
    * Login
    * Register
    * Reset Password
    * JwtAuthGuard
    * `@HasRole` decorator
* Validators: 
    * AbstractUniqueValueValidator
    * ArrayDistinctValidator
    * DateValidator
    * EntityExistsValidator
    * UniqueValueValidator

## To-do features
* Fix Current Unit Tests
* Pagination example
* More unit tests 
* Auth using Social Media
* Demo link

## Technology Stack
* Node.js
* TypeScript
* TypORM
* PostgreSQL

## Installation

```bash
$ npm install
```

After that, copy `.env.example` to `.env` and update it accordingly.

## Running migrations
```bash
# running migration files
npm run migration:run

# creating a new migration file 
npm run migration:create migrationName

# generating a diff between db scema and entities
npm run migration:generate migrationName

# DB schema update with drop DB
npm run migration:schema:update

# sync db scheam with entities
npm run migration:sync

# see diff without running
npm run typeorm schema:log
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Nest useful CLI commands
https://docs.nestjs.com/cli/usages

## License

  Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
 
## Contribute

-   Please give us :star: on Github, it **helps**!
-   You are more than welcome to submit feature requests
 
## Contributors
View full list of our [contributors](https://github.com/GarryOne/nest-boilerplate-starter/graphs/contributors).

## Contact us
- Author - [GarryOne](https://twitter.com/GarryOne)
- Website - [https://7code.ro](https://7code.ro/)
