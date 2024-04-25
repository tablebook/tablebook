# TableBook

> Online meeting minutes editor

**Currently live at https://tablebook.onrender.com/**

[![Coverage Status](https://coveralls.io/repos/github/tablebook/tablebook/badge.svg)](https://coveralls.io/github/tablebook/tablebook)

## Summary

- The application is created with [JavaScript](https://developer.mozilla.org/en-US/docs/Web/javascript) and consists of a [Vite](https://vitejs.dev/)/[React](https://react.dev/) frontend, a [Node](https://nodejs.org/en) backend with an [Express](https://expressjs.com/) API and a [MongoDB](https://www.mongodb.com/) database.

## Client

- The client runs a [Vite](https://vitejs.dev/)/[React](https://react.dev/) frontend, that runs a web based minutes editor.
- Minutes can be created, edited, styled, signed, saved, shared, read, downloaded or printed using the editor.
  - Signing is done using [react-signature-canvas](https://www.npmjs.com/package/react-signature-canvas).
  - PDF features are created using [react-pdf](https://react-pdf.org/).
    - [Markdown](https://www.codecademy.com/resources/blog/what-is-markdown/) (or [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)) can be used when creating minutes.
      - Markdown is parsed to HTML using [marked](https://www.npmjs.com/package/marked) (and some custom parsing).
      - Pure HTML is then rendered to PDF using [react-pdf-html](https://www.npmjs.com/package/react-pdf-html).
- Client saves, fetches and updates minutes through server when minutes are shared.
  - Shared minutes can be accessed with a read-only or write link
- Minutes are temporarily saved to [session storage and local storage](https://javascript.info/localstorage) when editing.
  - Session storage allows working on separate tabs simultaneously, and local storage allows last minutes to be loaded even after closing the tab.
- Localization is done with [i18next](https://www.i18next.com/)

### Client testing

- Client is tested thoroughly with [unit/component tests](https://www.guru99.com/component-testing.html) for most components.
- [Vitest](https://vitest.dev/) is used as the test runner.
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) is used to render/test the components.
- Component tests [mock](https://stackoverflow.com/a/2666006/23066817) any dependencies to other modules and all required contexts.
- Some custom [hooks](https://www.w3schools.com/react/react_hooks.asp) are also tested.

### Client setup

1. [Node](https://nodejs.org/en) 20.x is required
2. Run `npm install` on `/client` directory
3. These scripts can now be run:
  - `npm run dev` to start standalone dev server with [hot reload](https://stackoverflow.com/a/43246550/23066817).
  - `npm run build` to bundle client. This is **required** if you want the server to serve the client files.
  - `npm run lint` to run [Eslint](https://eslint.org/) for checking code formatting and style.
  - `npm test` to run client tests.

For running the whole application, check [Server setup](#server-setup)


## Server

- The server is created with [Node](https://nodejs.org/en) and runs an [Express](https://expressjs.com/) server with [CRUD](https://www.freecodecamp.org/news/crud-operations-explained/) endpoints for storing minutes.
- Server also serves the client files from the URL root.
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

For running the application without any additional setup using Docker, see: [Development with Docker](#development-with-docker).

1. [Node](https://nodejs.org/en) 20.x is required
2. Run `npm install` in `/server` directory
3. Setup the environment in `.env` file
  - See `.env.template` for reference.
  - The `docker-compose.dev.yml` on repository root level can be used for running the database locally. Connection string would then be something like this: `mongodb://localhost:27017/tablebook_dev` the last part is the name of the database and can be chosen freely.
4. Build the client if you want the server to serve the client files from the URL root [see instructions here](#client-setup)
5. These scripts can now be run:
  - `npm start` for running server in production mode
  - `npm run dev` for running server in development mode ([hot reload](https://stackoverflow.com/a/43246550/))
  - `npm run lint` to run [Eslint](https://eslint.org/) for checking code formatting and style.
  - `npm test` to run server tests.


### API Documentation

- The autogenerated [OpenAPI/Swagger](https://www.openapis.org/) documentation is found at server `/api` endpoint.
  - Fully interactable testing interface
  - Includes full request/response schemas and example requests/responses
  - Currently deployed documentation is found here: https://tablebook.onrender.com/api
  - The OpenAPI documentation is created from [Zod](https://zod.dev/) endpoint schemas. Using [zod-to-openapi](https://www.npmjs.com/package/@asteasolutions/zod-to-openapi).
  - The OpenAPI interactable documentation endpoint is created with [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)
- Old documentation was created with [Postman](https://www.postman.com/) and could be found [here](https://documenter.getpostman.com/view/24955418/2sA2xmUqFr). **It is no longer updated**.
  - Postman documentation was thorough but not as not easily updated, as every request needed to be run again manually after any changes to API.



## CI/CD

- Development of this project is automated using [GitHub Actions](https://docs.github.com/en/actions).
- The `main` branch is protected and pushes to it can only be done through [pull-requests](https://docs.github.com/en/pull-requests) that need to pass the automated branch verification and reviewed by a team member.
- The verification job in the [CI](https://www.geeksforgeeks.org/what-is-ci-cd/) pipeline runs [linters](https://www.testim.io/blog/what-is-a-linter-heres-a-definition-and-quick-start-guide/), tests and possible builds on both frontend and backend. It also starts the server and runs [End-To-End (E2E) tests](https://katalon.com/resources-center/blog/end-to-end-e2e-testing) on it.
- The CI pipeline runs also when the changes are merged to `main` branch, and in addition to the `verification` job, it has three jobs that are **only** run when `main` is merged: `tag_release`, `publish_docker_image` and `deploy_to_render`.
  - After the `main` branch is verified, the commit is tagged with a [sematic version](https://www.geeksforgeeks.org/introduction-semantic-versioning/).
  - After that, a [docker image](https://www.techtarget.com/searchitoperations/definition/Docker-image) is created and published to [ghcr.io](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry) with the same sematic version tag that the commit was tagged with. It's also tagged with `latest`. It can then be found in the repository packages.
  - Finally, the pipeline calls [Render](https://render.com/) to trigger the redeployment of the application. The Render deployment always fetches the image with the `latest` tag.
- If any job fails, the following jobs are not run.

## Containerization

- [Docker](https://www.docker.com/) is heavily utilized in deployment and development of the project

### Deployment with Docker

- The application is packaged into an optimized [docker image](https://www.techtarget.com/searchitoperations/definition/Docker-image) with a [multi-stage dockerfile](https://docs.docker.com/build/building/multi-stage/).
- This production dockerfile builds the client in the build stage and the final stage only consist of the server (without dev dependencies) and the bundled client files that the server serves.
- This image uses the node:20-bookworm-slim [Node image](https://hub.docker.com/_/node/) as the base image for optimized image size. The alpine-version is the smallest, but is using an unofficial Node version and has some other disadvantages. ([see source here](https://snyk.io/blog/choosing-the-best-node-js-docker-image/))
- This production dockerfile can be tested locally with the `docker-compose.yml` that runs the production image with a [MongoDB image](https://hub.docker.com/_/mongo/).

#### Docker image usage

- The published docker image can be run anywhere using for example a docker compose file like this:

```
services:
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    restart: always
  app:
    image: 'ghcr.io/tablebook/tablebook:latest'
    ports:
      - 8080:8080
    environment:
      PORT: 8080
      MONGODB_CONNECTION_STRING: mongodb://mongodb:27017/tablebook_dev
      SECRET: devsecretnottobeusedinproduction
```
- A database is needed to run the container
- The environment variables needed can be checked from `server/.env.template`

### Development with Docker

#### Development mode

- The `docker-compose.dev.yml` is used to run the whole app in development mode.
- This [docker compose](https://docs.docker.com/compose/) file runs a [MongoDB image](https://hub.docker.com/_/mongo/) and both the frontend and the backend development servers with [hot reload](https://stackoverflow.com/a/43246550/23066817).
  - Hot reload seems to only work on [Docker engine for Linux](https://docs.docker.com/engine/install/)
    - If running Windows, it's recommended to install Docker on [WSL Ubuntu](https://ubuntu.com/desktop/wsl) (or some other [Linux distribution](https://en.wikipedia.org/wiki/List_of_Linux_distributions)) instead of [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- File changes are applied also in the containers because [volumes](https://docs.docker.com/storage/volumes/) are created to sync the project files on the host machine and the container.
  - Windows filesystem doesn't seem to allow syncing and this is why the mentioned feature doesn't work on Windows.

#### Production mode

- The `docker-compose.yml` is used to run the whole application in production mode locally.
- This setup runs only the database and the server.
- The client is served from server root path like in production.


## End-To-End Testing (E2E)

- [End-To-End (E2E) tests](https://katalon.com/resources-center/blog/end-to-end-e2e-testing) are created with [Cypress](https://www.cypress.io/).
- E2E files are located in a fully separate `e2e` directory in the repository to make it clear that they are not tests for the server or the client, but tests for a complete application.
- The server needs to be running in order to run the E2E tests. They could in theory be run against the [Vite](https://vitejs.dev/) development server, but the point of these tests are to test the package as a whole. This means that the server serves the client files, the client renders as expected, and that the client can make requests to the server.
- E2E tests are crucial for the CI verification to guarantee that the application components actually work together.
- The E2E tests make sure the page renders and then it runs a full scenario where most features are utilized as intended.

### E2E setup

1. Setup server (and build the client). See instructions [here](#server-setup).
2. Install E2E dependencies by running `npm install` in `/e2e` directory.
4. Run the tests with `npm test` in the `/e2e` directory
  - If you encounter problems when running Cypress on Linux, follow the Cypress [Linux Prerequisites](https://docs.cypress.io/guides/getting-started/installing-cypress#Linux-Prerequisites) instructions.

