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

A single-page web application that acts as the main frontend for the Trébol
eCommerce software project.

Originally written using [Angular 9](https://v9.angular.io/docs),
and over the years migrated up to [Angular 15](https://v15.angular.io/docs).

Please see [CHANGELOG.md](CHANGELOG.md) for a detailed overview of the latest
changes & additions to the codebase.

## Live Demo

Visit the application live demo
[in this link](https://trebol-ecommerce.github.io/ngx-trebol-frontend/).

To access the administration panel, access the login dialog by click
on the button with an user icon in the top right corner of the screen.

With the login dialog open, type `admin` as both username and password in it.
The dialog will close itself, and the aforementioned button should
become a dropdown menu with an option to navigate to the admin panel.

### Mock data

This demo feeds on a feature module that provides data stored in hard-coded
JS arrays; thus, your browser's working memory acts as a fake persistence
layer. You can try all the CRUD-related functionality, but once you force a
reload or leave the web application, all changes in the data will be lost.

This is interchangeably called the "fake API" as well the "local-memory module".
In this project they mean the same thing.

Most of the data itself was generated using [Mockaroo](https://mockaroo.com/).

Placeholder images are served from [Fake Images Please](https://fakeimg.pl/).

## Features

The application itself is divided into modules in the `/src/app/` directory,
and its structure is as follows:

- [`store/`](src/app/store/) -
  The eCommerce components and pages, such as the frontpage,
  the product catalog, the checkout wizard page, and the receipt page.
- [`management/`](src/app/management/) -
  The administration (PoS) area of the app. Authorized users may be able to
  review all the sales; query all products and their categories;
  create accounts for other users; list customers; upload images for products,
  among other things.
- [`shared/`](src/app/shared/) -
  Exports Angular components, directives, and general elements that are used
  by other modules and/or the application as a whole.
- [`api/`](src/app/api/) -
  Contains interfaces, modules, and dependency injection tokens to interact
  with [the backend REST API](https://github.com/trebol-ecommerce/api).
  - [`local-memory/`](src/app/api/local-memory/) -
    Serves a fake API [as explained above](#mock-data).
    It's the default option to build and serve the webapp with.
  - [`http/`](src/app/api/http/) -
    Serves access to a real, running backend server with an exposed REST API
    compliant to the specification linked above.
    The Spring Boot [monolith](https://github.com/trebol-ecommerce/trebol-backend-monolith)
    is exactly that.

The `api` module is [imported through](#configure-the-build--serve-process)
an environment file which makes it painless to switch between implementations.

### Testing

Unit tests use Jasmine and run on top of Karma.

#### Running unit tests once

Execute `ng t --no-watch --browsers={browser}` in the root directory
to test the entire application immediately, only once.
Supported browsers are `Chrome`, `Edge`, `Firefox`, `Safari`,
and you can add more to the [`karma.conf.js`](src/karma.conf.js) file.
There's also `ChromeHeadless` which is useful for CI pipelines
such as [the one setup here](.github/workflows/build.yml).

#### Live unit testing

1. Execute `ng t` or `ng test` in the root directory to start the Karma server.
2. Connect to its listening address (e.g. `localhost:9876`) with the browser(s)
   of your preference to prepare them for parallel testing.
3. In the root directory, under a different terminal process, trigger the tests
   anytime by executing `karma run`.
   Alternatively, in the browser window, you can press the `DEBUG` button, to
   initiate the test suites in debug mode.

### Language support

This project uses
[Angular i18n features](https://angular.io/guide/i18n-overview);
this means you can build the app using different languages.
Currently bundled locales reside in [`/src/locales`](src/locales/).
There are three:

- `en-US`
- `es`
- `es-CL`

If you wish to translate this frontend to another language,
check out this Angular guide on
[working with translation files](https://angular.io/guide/i18n-common-translation-files).

## Usage

### Requirements

- [v15-compatible](https://github.com/angular/angular-cli/releases/tag/15.0.0)
  installation for [Node.JS](https://nodejs.org/).
- [Angular CLI](https://cli.angular.io/) v15 or higher
  (view [v15 docs here](https://v15.angular.io/cli)).

### Quick setup

1. Clone this repo.
2. Execute `npm ci` in the root directory (where the `package.json` file is).
3. Execute `ng s` or `ng serve` in the root directory
   to preview-run the application.
   This is equivalent to visiting the live demo linked above.
4. To work with a backend, you should set up your working environment.
   See `Quick setup` below.

### On the configuration, build, and serve processes

- Make yourself comfortable with the official Angular guide on
  [Building and Serving Apps](https://v15.angular.io/guide/build).
- Default environment files already exist in
  [`/src/environments/`](src/environments/)
  - [`environment.ts`](src/environments/environment.ts)
    defines application-wide constants.
  - [`environment-modules.ts`](src/environments/environment-modules.ts)
    defines module dependencies.
- The [`/angular.json`](angular.json) file contains some additional configs;
  I mostly use `staging`, `localhost` and `production`.
  The latter two require you to define environment files
  as specified by their `fileReplacements` definitions.
  - There's also a configuration for
    each bundled locale other than default `en-US`.
  - While Angular supports using more than one configuration at the same time,
    things may break. Only try this when you know what you're doing.
- This project also declares the plugin for
  [angular-cli-ghpages](https://github.com/angular-schule/angular-cli-ghpages#options)
  as a devDependency, which you may find useful
  to deploy to a GitHub Pages environment, like the live demo here does.

### Using a backend server

1. Create a copy of the two environment files
   and rename them accordingly from your desired configuration
   e.g. `environment.localhost.ts` and `environment-modules.localhost.ts`.
2. Call `ng s` or `ng b` Angular CLI command using the `-c` option
   to target said configuration e.g. `ng b -c production`.
   You can target more than one, separating them by commas `,`.
3. If you used `ng b`, serve the files from your preferred webserver.
   I used to run `php -S localhost:80` from the resulting
   `./dist/ngx-trebol-frontend/` directory.
   To use any of the [locales mentioned above](#language-support)
   you'll have to either:

    1) Mind the corresponding locale subdirectory, or
    2) Remove, comment or change the value of the `<base>` tag
       in the generated `index.html` file.

## Contributing to this repository

I accept all kinds of contributions! However, please review the
[contribution guidelines](https://github.com/trebol-ecommerce/ngx-trebol-frontend/blob/main/CONTRIBUTING.md)
before proceeding.

*I also accept help writing better contribution guidelines, wink wink.*

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
