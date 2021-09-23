# Trébol (Spanish Clover), The Virtual Web Store
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
[![Build Status](https://travis-ci.com/trebol-ecommerce/ngx-trebol-frontend.svg?branch=source)](https://travis-ci.com/trebol-ecommerce/ngx-trebol-frontend)

## Status

First stable version released! You can try the demo environment which runs with a mocking data module that shares an equivalent API stored in your browser's local memory.

## Background

Trébol was born from a career project, a hardware store web system called 'FERME Web'. It was an Angular dashboard application that communicated by a REST API to a backend service. Then it could list all product data stored in a MySQL database, add products to a cart and create fake selling transactions.
Trébol pushes the idea forward and aims to become an industry-standard online shop application focused on being secure, modern and extensible.

## Infrastructure

The application itself lives in the `/src/app/` directory, and is inmediately followed by feature modules. Excepting for the `/api` module, each one is divided into bare components, bare directives, a routing module if any, routed components and dialog components.
* `store/` contains the module with everything that conforms the shopping section; you can view the product catalog, log in or sign up for an account, reviewing cart, check out, etcetera.
* `management/` contains components, services and directives to administer the internals and POS: register, update and categorize products; create users; list customers; upload images, etcetera.
* `shared/` has reusable components by other modules.
* `api/` contains the dependency injection tokens, interfaces and modules tying both things together to interact with the [the backend APIs](https://github.com/trebol-ecommerce/trebol-api)
  * `local-memory/` contains a fake/mock API implementation written entirely in client-side TypeScript code. It's the default option to build and serve with; used for the demo and sometimes for unit tests as well.
  * `http/` contains the http implementation module and services; these are for calling the real API.

Plus, two folders that matter to the entire codebase:
* `models/` contains the data types (TS classes) used across the application.
  * `entities/` has those models that are sent to and received from the APIs.
* `i18n` contains internationalization files. **And needs a heavy update...**

## Requirements

* An [Angular CLI](https://cli.angular.io/) 10-compatible [Node.js/NPM](https://nodejs.org/) installation.

## Working with the code

* `git clone` the repository somewhere in your machine.
* `npm install` in the root directory.

## Testing

Jasmine tests are providing about 60% code coverage, you can give them a try using `ng test` in the root directory. Travis runs these on every push to `source` or any pull request.

## Configuring the build / serve process

* The default environment files are located in `/src/app/environments/`; one is for the simpler variables and the one is for module dependencies.
* The `/src/angular.json` file contains two base configuration definitions that you can use: `production` and `localhost`.
* Make yourself comfortable with the [official guide on Building and Serving Angular Apps](https://angular.io/guide/build). Basically, you need to create a copy of the environment files, rename them following the pattern for your desired configuration, and call the `ng` command, targetting said configuration.
* You can also use the [angular-cli-ghpages plugin](https://github.com/angular-schule/angular-cli-ghpages#options) to automate your deployment.

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
