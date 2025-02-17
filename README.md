<h1 align="center">Trébol eCommerce Angular Frontend</h1>

<div align="center">

  <a href="https://angular.io">
    <img src="https://angular.io/assets/images/logos/angular/angular.svg"
    height="120" alt="Angular Logo">
  </a>

  <!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

  [![Supported Angular Version](https://img.shields.io/github/package-json/dependency-version/trebol-ecommerce/ngx-trebol-frontend/@angular/core?color=d90036)](https://github.com/trebol-ecommerce/ngx-trebol-frontend/blob/main/package.json)
  [![Latest GitHub Release](https://img.shields.io/github/v/release/trebol-ecommerce/ngx-trebol-frontend?include_prereleases)](https://github.com/trebol-ecommerce/ngx-trebol-frontend/tags)
  [![Travis Build Status](https://app.travis-ci.com/trebol-ecommerce/ngx-trebol-frontend.svg?branch=main)](https://travis-ci.com/github/trebol-ecommerce/ngx-trebol-frontend)

</div>

A single-page application that acts as the main frontend for the Trébol eCommerce project.
Originally written using [Angular 9](https://v9.angular.io/docs), and over the years migrated up to [Angular 15](https://v15.angular.io/docs).

## Current status

Working towards alignment with [Trébol API v3.0](https://github.com/trebol-ecommerce/api/blob/v3.0.0/src/trebol-api.json).

Please see [CHANGELOG.md](CHANGELOG.md) for a detailed overview of the latest changes & additions to the codebase.

## Live Demo

[Visit the application live demo in this link](https://trebol-ecommerce.github.io/ngx-trebol-frontend/).

To access the administrative/management section and all its features, click on the button with an user icon in the top right corner of the screen. It should greet you with the login dialog. Then type `admin` as both username and password in it. And then, the aforementioned button should have a menu with the option to navigate to the admin panel.

### Mock data

This demo is powered by a feature module that provides data stored in hard-coded JS arrays; this means that your browser's working memory acts as a fake and volatile persistence layer. You can try all CRUD-related functionalities as you'd expect, but if you force a reload or leave the application, all changes in data will be lost.

At scale, I interchangeably call this the "fake API" and the "local-memory module". In both cases I mean the same thing.

Most of the data itself was generated using [Mockaroo](https://mockaroo.com/).

## Features

The application itself is divided into modules in the `/src/app/` directory, and its structure is as follows:

- `store/` most of the public-facing components; there's the frontpage (aka the product catalog), the checkout page, and the receipt page
- `management/` the administrative area of the app: there you register, update and categorize products; create users; list customers; upload images, etcetera
- `shared/` exports Angular components, directives, and general elements that are used by other modules, and the application as a whole
- `api/` contains interfaces, modules, and dependency injection tokens to interact with [the backend REST API](https://github.com/trebol-ecommerce/api)
  - `local-memory/` serves a fake API basically running in the browser itself; it's the default option to build and serve with; and the live demo (see above) uses it too.
  - `http/` serves an access to a real API through HTTP calls; these require a real, running backend with an exposed REST API compliant to the specification linked above.

The `api` module is [imported through an environment file](#configure-the-build--serve-process) which makes it painless to switch between implementations.

### Testing

Unit tests use Jasmine and run on top of Karma.

#### Running unit tests once

Execute `ng t --no-watch --browsers={browser}` in the root directory to test the entire application immediately, only once.
Supported browsers are `chrome`, `edge`, `firefox`, `safari`, and you can add more to the `karma.conf.js` file.

#### Live unit testing

1. Execute `ng t` or `ng test` in the root directory to _simply start the Karma server_.
2. Connect to its listening address (e.g. `localhost:9876`) with the browser(s) of your preference to prepare them for parallel testing.
3. In the root directory, under a different terminal process, trigger the tests anytime by executing `karma run`. Alternatively, in the browser window, you can press the `DEBUG` button, to initiate the test suites in debug mode.

### Internationalization

This project uses [Angular i18n features](https://angular.io/guide/i18n-overview); this means you can build the app using different languages. Currently bundled locales reside in `/src/locales`. There are three:

- `en-US`
- `es`
- `es-CL`

If you wish to translate this frontend to another language, check out [this Angular guide on working with translation files](https://angular.io/guide/i18n-common-translation-files).

## Usage

### Requirements

- A [v15-compatible installation](https://github.com/angular/angular-cli/releases/tag/15.0.0) for [Node.JS](https://nodejs.org/).
- [Angular CLI](https://cli.angular.io/) v15 or higher (view [v15 docs here](https://v15.angular.io/cli)).

### Quick setup

1. Clone this repo.
2. Execute `npm ci` in the root directory (where `package.json` resides).
3. Execute `ng s` or `ng serve` in the root directory to preview-run the application. This is equivalent to visiting the live demo linked above.
4. To work with a backend, you should set up your working environment. See `Quick setup` below.

### Using a backend

1. Create a copy of the two environment files and rename them accordingly from your desired configuration e.g. `environment.localhost.ts` and `environment-modules.localhost.ts`.
2. Call `ng s` or `ng b` Angular CLI command using the `-c` option to target said configuration e.g. `ng b -c production`. You can target more than one, separating them by commas `,`.
3. If you used `ng b`, serve the files from your preferred webserver. I often do `php -S localhost:80` from the resulting `./dist/ngx-trebol-frontend/` directory. If you use any of the above mentioned locales you'll have to either:
  A) mind the corresponding subdirectory
  B) remove, comment or change the value of the `<base>` tag in the generated `index.html`

### On the configuration, build, and serve processes

- Make yourself comfortable with the [official guide on Building and Serving Angular Apps](https://v15.angular.io/guide/build).
- Default environment files already exist in `/src/environments/`
  - `environment.ts` defines variables
  - `environment-modules.ts` defines module dependencies
- The `/src/angular.json` file contains some additional configs; I mostly use `staging`, `localhost` and `production`. The latter two require you to define environment files as specified by their `fileReplacements` definitions.
  - There's also a configuration for each bundled locale other than default `en-US`.
  - You can use more than one configuration, but some of the definitions will collide. Please do have a look at them before trying to use them.
- This project also declares the [angular-cli-ghpages plugin](https://github.com/angular-schule/angular-cli-ghpages#options) as a devDependency, which you may find useful to deploy to a GitHub Pages environment like in the live demo.

## Contributing to this repository

I accept all kinds of contributions! However, please review the [contribution guidelines](https://github.com/trebol-ecommerce/ngx-trebol-frontend/blob/main/CONTRIBUTING.md) before proceeding.

*I also accept help writing better contribution guidelines.*

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/eLeontev"><img src="https://avatars1.githubusercontent.com/u/15786916?v=4?s=100" width="100px;" alt="eLeontev"/><br /><sub><b>eLeontev</b></sub></a><br /><a href="https://github.com/trebol-ecommerce/ngx-trebol-frontend/commits?author=eLeontev" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/dmodena"><img src="https://avatars3.githubusercontent.com/u/11446011?v=4?s=100" width="100px;" alt="Douglas Modena"/><br /><sub><b>Douglas Modena</b></sub></a><br /><a href="#example-dmodena" title="Examples">💡</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Fictionistique"><img src="https://avatars.githubusercontent.com/u/40859110?v=4?s=100" width="100px;" alt="Chirag"/><br /><sub><b>Chirag</b></sub></a><br /><a href="https://github.com/trebol-ecommerce/ngx-trebol-frontend/commits?author=Fictionistique" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/M-AamirBakhtiar"><img src="https://avatars.githubusercontent.com/u/56411169?v=4?s=100" width="100px;" alt="Aamir Bakhtiar"/><br /><sub><b>Aamir Bakhtiar</b></sub></a><br /><a href="https://github.com/trebol-ecommerce/ngx-trebol-frontend/commits?author=M-AamirBakhtiar" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.nazislam.com"><img src="https://avatars.githubusercontent.com/u/18671102?v=4?s=100" width="100px;" alt="Naz Islam"/><br /><sub><b>Naz Islam</b></sub></a><br /><a href="https://github.com/trebol-ecommerce/ngx-trebol-frontend/commits?author=nazislam" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
