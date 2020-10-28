# Trébol (Spanish Clover), The Virtual Web Store
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Trébol was born as a grown-up version of a hardware store web system called 'FERME Web'. Initially I created an Angular dashboard application that connected to a REST API-assisted backend service, that could list all the content stored in a MySQL database.
That functionality, and the boilerplate code associated, sits at the core of this project. Trébol aims to become an industry-standard online shop application that can be used by any business model and frontend developer alike, to learn about implementing good practices, safety rules, and recommendations for building similar eCommerce systems.

## Infrastructure

This application is divided into feature modules within the `/src/app` directory. The first two come with a `local-memory` implementation.
* `auth` provides service interfaces for doing authentication and authorization requests.
* `data` provides service interfaces for querying and working with data.
* `management` provides guarded routes, components and services to manipulate (CRUD) said data, much like an admin dashboard.
* `shared` contains components used by other modules. It also brings a separate `angular-material.module` for all the imports used, application-wide.
* `store` provides public routes for the store catalog, cart review, checkout and receipt pages.

## Requirements

* An Angular 10-compatible Node.js/NPM installation.

## Configuration

If you want to use an external backend for the `auth` or `data`, you should create production environments for them.
* See the `production` configuration in the `/angular.json` file for details. To sum it up, it uses the `fileReplacements` strategy; you need to duplicate the files in `/src/environments`, renaming each one to `*.prod.ts`, and fill their required properties, like the external web endpoints to connect to.
* Then, the resulting `environment.prod.ts` file should point to the `http` feature implementation modules (`/src/app/auth/http` and `/src/app/data/http`).
* The services provided in said modules are already pointing to the default environment files.

## Testing

Jasmine tests aren't so detailed yet, but you can give them a try using `ng test` in the root directory.

## Running

As you travel the root directory after checking out:
* To serve it locally, simply do `ng serve`. By default it runs the demo environment, using the browser's local memory for storage.
* To build, do `ng build`. You might want to add the `--prod` flag, if you configured a production environment as described above.
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
