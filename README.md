# Teaching kit

## Prerequisites

This project runs on a postgres database. In order to start the project you have to have postgres on your computer, as well as a postgres database running on port 5432. See more info about how to set this up in `docs/database.md`

## Environment variables

Create a file called `.env` (and make sure this file is in `.gitignore` so that it doesn't get pushed to github). The environment variable names should be present in `.env.example`. Get their corresponding values from someone familiar with the project.

## Getting started

Before getting started you should run `npm install`. Then use the commands specified below based on your needs.
In order to have some starting data to your local environment, you could create a database dump like specified in `docs/database.md`, or ask someone familiar with the project if they can share a pre-existing dump with you.

---

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-develop)

```
npm run develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-start)

```
npm run start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-build)

```
npm run build
```

## Deployment

The way the environment is setup at the time of writing (2022-12-02), there is only one deployed environment being present (which currently is a development environment, since this service hasn't been released yet). In order to deploy a new version of the app, you can follow the steps specified in `docs/ec2.md`
