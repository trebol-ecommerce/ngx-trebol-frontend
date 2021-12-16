# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Angular i18n support
  - Include localization package
  - Mark text for translation - __Now it's possible to generate translation files using the command `ng extract-i18n`__
  - Translate texts to English, set as default language
  - Include files and build configurations for the following locales:
    - `en-US` (default)
    - `es`
    - `es-CL` (previous default)
- Tree interface for product categories
  - Only works with API v1.1.2; categories must be identifiable by their code property, which is a string

### Changed
- Add the unitValue property to ReceiptDetail model class making the model compatible with the new API.
- This change updates the entity model for Person and the corresponding data forms.
- Added a table component to display details in the receipt page.
- Included Edge browser launcher for Karma tests
- Add properties `token`, `taxValue`, `transportValue`, `totalValue`, `totalItems` to Receipt model class (Compliance with API v1.1)
  - Also make `amount` optional and make `totalValue` required (`totalValue` will replace `amount`)
- Include new information in receipt page
- Follow deprecation of certain API paths as detailed in the changelog for API v1.1}
  - Use query parameters instead of path parameters for fetching single entities
- Introduce `code` property in Image class as temporary identifier generated on server-side
- Introduce `Shipper` class with a single `name` property as new entity model

### Fixed
- Footer remains stuck at the bottom of the page, instead of the viewport.
- Karma tests not starting after connected from a browser (+ now displays spec results in console)
- Interface for 'inserting' images from the management dashboard
  - Since there is no available API for uploading them, use a plain-text form as fallback
- Interface for 'inserting' products
  - Category was mandatory, but categories did not yet have any interface to create them with 🤦‍♂️
  - Now one can pick from the category tree
- Interface for adding new personal information - Phones had to be excluded or comply with a regex pattern

### Removed
- Old `localhost.proxy.conf.json` used to bypass CORS e.g. for servers running in localhost. Angular still guides users on how to create these, but it's not a good practice. Instead, your server should be configured so CORS allows your deployment to do requests.

## [v1.0.1] - 2021-10-21

### Fixed
- Login status not refreshing when using local memory (mock) api module
  - Fix related unit tests

## [1.0.0] - 2021-09-23

First public version.
