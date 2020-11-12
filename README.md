# Trébol (Spanish Clover), The Virtual Web Store
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Trébol was born as a grown-up version of a hardware store web system called 'FERME Web'. Initially I created an Angular dashboard application that connected to a REST API-assisted backend service, that could list all the content stored in a MySQL database.
That functionality, and the boilerplate code associated, sits at the core of this project.
Trébol aims to become an industry-standard online shop application. Businesses can use this solution to bring their eCommerce systems together in a short time. Developers can learn and improve on it to build similar eCommerce systems.

## Infrastructure

The layout within `/src/app/` goes as follows:
* `models/` contains the data types (TS classes).
* `api/` contains the dependency injection tokens used to consume APIs, and modules that provide service dependencies for said tokens:
  * `store/` provides calls for displaying products in the storefront, categories, specific product details, info on the company and checking out with products in the shopping cart.
  * `data-mgt/` provides calls for querying and working with data and authorization accesses based on data contexts.
  * `session/` provides calls for creating accounts, logging in and out, and review personal profile data.
* `management/` has components to interactively manipulating data in different contexts, using child routes like an admin dashboard.
* `shared/` has components used by other modules.
  * It also brings a `angular-material.module` to clearly state all the imports used, application-wide.
* `store/` has components for all the store routes (catalog, cart review, receipt, and some dialogs).

## Requirements

* An [Angular CLI](https://cli.angular.io/) 10-compatible [Node.js/NPM](https://nodejs.org/) installation.

## Getting the code

* First, `git clone` the repository.
* Then, in the root directory, do `npm install` to fetch all node modules and have it.

## Configuration

If you plan to use an external backend for the APIs, you must create production environments for them. Trébol is configured to use several `fileReplacements` when launching a production build; see the `production` configuration in the `/angular.json` file for the exact replacement patterns that apply.

If you happen to run a server in the same machine (aka localhost), (you can test it quickly with a proxy)[https://angular.io/guide/build#proxying-to-a-backend-server] to avoid CORS errors. Use the `/localhost.proxy.conf.json` file as example.

To connect to your production environment, you must:
* Duplicate every file in `/src/environments`, and rename each to `*.prod.ts`.
  * Your resulting `environment.prod.ts` file must import the `http` API implementation modules (for example, `import { HttpStoreApiModule } from 'src/app/api/store/http/http-store-api.module'`).
  * If you use localhost, leaving the api URL constants empty in every `*-api.environment.prod.ts` file should suffice, for your requests will be proxied (read on to "Building / Running").
  * If not, assign them. Note that they may be separate constants and files, but they can have the same value and be served from the same machine.

## Testing

Jasmine tests are providing about 60% code coverage, you can give them a try using `ng test` in the root directory.

## Building / Running

As you travel the root directory after checking out:
* To serve it locally, do `ng serve`
* To create the static site, do `ng build` (a `/dist/` folder will be created with its contents)
In both cases, you might want to add the `--prod` flag if you configured a production environment as described above.
And if you are using localhost, you can add the `--proxy-config [file]` flag to divert all requests to the configured server.


* To deploy it somewhere else, do `ng deploy`. Inspect https://github.com/angular-schule/angular-cli-ghpages#options for more on this.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/eLeontev"><img src="https://avatars1.githubusercontent.com/u/15786916?v=4" width="100px;" alt=""/><br /><sub><b>eLeontev</b></sub></a><br /><a href="https://github.com/bglamadrid/trebol-ng/commits?author=eLeontev" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/dmodena"><img src="https://avatars3.githubusercontent.com/u/11446011?v=4" width="100px;" alt=""/><br /><sub><b>Douglas Modena</b></sub></a><br /><a href="#example-dmodena" title="Examples">💡</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
