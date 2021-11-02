# Trébol (Spanish Clover), The Virtual Web Store
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

![NPM Package](https://img.shields.io/npm/v/ngx-trebol-frontend)
[![Build Status](https://app.travis-ci.com/trebol-ecommerce/ngx-trebol-frontend.svg?branch=main)](https://travis-ci.com/github/trebol-ecommerce/ngx-trebol-frontend)

## Status / Roadmap

Currently working towards support for [the next minor API version (v1.1)](https://github.com/trebol-ecommerce/api/releases/tag/v1.1.0).

## Infrastructure

The application itself lives in the `/src/app/` directory, and is inmediately followed by feature modules. Excepting for the `/api` module, each one is divided into bare components, bare directives, a routing module if any, routed components and dialog components.

- `store/` contains everything related to shopping itself; you can view the product catalog, log in or sign up for an account, reviewing cart, check out, etcetera.
- `management/` contains elements relating to the administration of data internals and POS: you register, update and categorize products; create users; list customers; upload images, etcetera.
- `shared/` exports stuff that is used by other modules.
- `api/` contains the dependency injection tokens, interfaces and modules to interact with the [the backend APIs](https://github.com/trebol-ecommerce/trebol-api)
  - `local-memory/` contains a fake/mock API implementation in client-side code. It's the default option to build and serve with; used for the demo and sometimes for unit tests.
  - `http/` contains the implementation module and services that work with HTTP calls; these require a real, running API.

There are also two folders that matter to the entire codebase:

- `models/` contains the data types (TS classes) used across the application.
  - `entities/` has those models that are sent to and received from the APIs.
- `i18n` contains internationalization files. **And needs a heavy update...**

## Requirements

- An [Angular CLI](https://cli.angular.io/) 11-compatible [Node.js/NPM](https://nodejs.org/) installation.

## Getting started with the code

Just do `npm install` in the root directory of your copy of the repository.

## Testing

Jasmine tests are providing about 40% of code coverage, you can give them a try using `ng test` in the root directory.

## Configuring the build / serve process

- The default environment files are located in `/src/environments/`; one is for the simpler variables and the one is for module dependencies.
- The `/src/angular.json` file contains two base configuration definitions that you can use: `production` and `localhost`.
- Make yourself comfortable with the [official guide on Building and Serving Angular Apps](https://angular.io/guide/build). Basically, you need to create a copy of the environment files, rename them following the pattern for your desired configuration, and call the `ng` command, targetting said configuration.
- You can also use the [angular-cli-ghpages plugin](https://github.com/angular-schule/angular-cli-ghpages#options) to automate your deployment.

## Contributing to this repository

Please review the [contributing guidelines](https://github.com/trebol-ecommerce/ngx-trebol-frontend/blob/main/CONTRIBUTING.md) before proceeding.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/eLeontev"><img src="https://avatars1.githubusercontent.com/u/15786916?v=4" width="100px;" alt=""/><br /><sub><b>eLeontev</b></sub></a><br /><a href="https://github.com/bglamadrid/ngx-trebol-frontend/commits?author=eLeontev" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/dmodena"><img src="https://avatars3.githubusercontent.com/u/11446011?v=4" width="100px;" alt=""/><br /><sub><b>Douglas Modena</b></sub></a><br /><a href="#example-dmodena" title="Examples">💡</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
