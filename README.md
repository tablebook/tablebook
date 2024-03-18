# TableBook

> Online meeting minutes editor

## Summary

- The application is created with [JavaScript](https://developer.mozilla.org/en-US/docs/Web/javascript) and consists of a [Vite](https://vitejs.dev/)/[React](https://react.dev/) frontend, a [Node](https://nodejs.org/en) backend with an [Express](https://expressjs.com/) API and a [MongoDB](https://www.mongodb.com/) database.

## Server

- The server is created with [Node](https://nodejs.org/en) and runs an [Express](https://expressjs.com/) server with [CRUD](https://www.freecodecamp.org/news/crud-operations-explained/) endpoints for storing minutes.
- Server also serves the client files from the URL root
- All API requests are validated with [Zod](https://zod.dev/).
- The database connection is handled with [Mongoose](https://mongoosejs.com/).

### Server testing

- Server is tested using integration tests that also test the database.
- [Jest](https://jestjs.io/) is used to run the tests.
- Tests run requests on the API using [SuperTest](https://www.npmjs.com/package/supertest).
- An in-memory database is created with [mongodb-memory-server](https://github.com/nodkz/mongodb-memory-server) when tests are run.
  - This allows running the tests without setting up an external database. Running tests inside a [CI](https://www.geeksforgeeks.org/what-is-ci-cd/) pipeline is also easier.
  - If we would've used a database where running an in-memory database isn't
  possible, [Testcontainers](https://testcontainers.com/) would be a great alternative. It just requires an environment with [Docker](https://www.docker.com/) to work.

### Server setup

1. Setup the environment
  a. See `.env.template` for reference.
  b. The `docker-compose.dev.yml` on reposity root level can be used for running the database locally. Connectionstring would then be something like this: `mongodb://localhost:27017/tablebook_dev` the last part is the name of the database and can be chosen freely.
2. Build the client if you want the server to serve the client files from the URL root
3. Run the server with...
  a. `npm start` for production
  b. `npm run dev` for development (hot reload)
  c. `npm test` for running tests

### API Documentation

- The updated API documentation is created with [Postman](https://www.postman.com/) and can be found [here](https://documenter.getpostman.com/view/24955418/2sA2xmUqFr).


## CI/CD

- Development of this project is automated using [GitHub Actions](https://docs.github.com/en/actions).
- The `main` branch is protected and pushes to it can only be done through [pull-requests](https://docs.github.com/en/pull-requests) that need to pass the automated branch verification and reviewed by a team member.
- The verification job in the [CI](https://www.geeksforgeeks.org/what-is-ci-cd/) pipeline runs [linters](https://www.testim.io/blog/what-is-a-linter-heres-a-definition-and-quick-start-guide/), tests and possible builds on both frontend and backend.
