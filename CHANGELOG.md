# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Angular i18n support
  - Include localization package
  - Mark text for translation - __Now it's possible to generate translation files using the command `ng extract-i18n`__
  - Translate texts to English, set as default language in `angular.json`
  - Include files and build configurations in `angular.json` for the following locales:
    - `en-US` (default)
    - `es`
    - `es-CL` (previous default)
- API models
  - New Class `Shipper` class with a single `name` property
- UI/UX
  - Manipulation of shippers
  - Manipulation of a product's category
  - Manipulation of all product categories through a tree view
    - Route added to the Management sidenav
    - This tree works on the assumption that categories are identified by a string property named `code`; see the section below

### Changed
- API models
  - `Image` - add `code` property (API v1.0.4)
  - `Person` - split `name` property into two: `lastName` and `firstName` (API v1.1.0)
  - `ReceiptDetail` - add `unitValue` property (API v1.1.1)
  - `Receipt`
    - Add properties `token`, `taxValue`, `transportValue`, `totalValue`, `totalItems` (API v1.1.1)
    - `totalValue` will replace `amount`; make the former required and the latter optional (API v1.1.1)
      - `amount` will be removed in future versions
  - `ProductCategory` - changed type of `code` from number to string (API v.1.2)
- UI/UX
  - Remove requirement of category in interface for creating/editing products
  - Receipt page
    - Added table component to display details
    - Include new information added to the model itself
- API paths deprecation
  - Use query parameters instead of path parameters for all single-entity operations
    - e.g. `/data/products/1` would now be called as `/data/products?id=1`

### Fixed
- Footer remains stuck at the bottom of the page, instead of the viewport
- Interface to upload images in management module not creating any data
  - There is no available API for uploading images; use a plain-text form as fallback

### Removed
- Old `localhost.proxy.conf.json` used to bypass CORS e.g. for servers running in localhost
  - Angular still guides users on how to create these, but it's not a good practice
  - Servers should always have CORS enabled and configured so that JavaScript apps can access them (see https://enable-cors.org/)

### Other
- Testing
  - Included Edge browser launcher for Karma tests
  - Fixed all warnings raised during unit tests

## [1.0.1] - 2021-10-21

### Fixed
- Login status not refreshing when using local memory (mock) api module
  - Fix related unit tests

## [1.0.0] - 2021-09-23

First public version.
