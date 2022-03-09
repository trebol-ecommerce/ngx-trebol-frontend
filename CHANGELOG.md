# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Service interface methods specific to sales data API
  - `markAsConfirmed` - To acknowledge an order/sell and notify the customer - HTTP `/data/sales/confirmation`
  - `markAsRejected` - To prevent an order/sell to be delivered due to issues and/or refund the customer - HTTP  `/data/sales/rejection`
  - `markAsCompleted` - To mark an order/sell as delivered - HTTP  `/data/sales/completion`
- Components to display sell data
  - Simple block for general data
  - Table to only display details (products/units/subtotal of each)
  - Dialog component for reviewing all information. Can be accessed by clicking sales management page table rows
    - Includes button to view the receipt of the transaction, only if, and once it has been, paid
    - Three buttons are included in the dialog, each of them acts as interface for the above mentioned interface methods for the sales data API
- Simple component for Google Maps iframe embeds
  - Includes pipe for trusting external resource urls (uses `DomSanitizer`)
- Search bar component for the frontpage header
- Search products page
  - Can be accessed by clicking on the aforementioned search bar
  - Allows filtering by category and/or product name
- Parameterizable content on the frontpage (settings can be configured using `environments`)
  - Site logo
  - Location map (at the bottom; uses above mentioned Google Map iframe embed)
  - Banners (top and bottom of the page)
  - Floating WhatsApp button
  - Contact information in footer (email, phone number)
- Two-way binding of state and query params in frontpage. Implemented states are:
  - Searching products by name and/or by category
  - Viewing individual products
- Entity model `Image` now has a `targetUrl` property
  - Slideshows images now may be able to hold links to redirect users to

### Changed
- Bump Angular to v13.2
- `DataManagerComponentDirective<T>` now exposes `items$` as `Observable<any[]>` instead of `Observable<T[]>`
- When adding images, `code` field is now optional
- Hide frontpage heading
- Replace title in frontpage header with search bar
- `AppService` now exposes an `userName$` observable
- Refactored receipt page to have its card as a separate component
- Let all dialogs be closed by clicking out of their bounds, except for the `confirmation` dialog
- Product cards hovered in frontpage use vertical gradient as a background instead of a solid color
- Renamed `ITransactionalProductListContentsDataApiService`
- `SlideshowComponent` now integrates with Angular forms

### Fixed
- Individual item fetching in HTTP API (used when editing any data)
- Change property type of `token` in `Sell` model to `string`
- Missing (optional) property `unitValue` in `SellDetail` model
- Missing references in fake APIs
  - Sales data
  - Account profile
- Logic for fetching receipt data
- Several issues with responsive screens in frontpage
- Product form not loading images from upstream
- Going backwards in a slideshow would omit the first index
- Prematurely end guest sessions
- Fail to send products without category
- Fail to add or remove images for products upon submission
- Products could not be filtered by partial name
- Alignment of some components
  - Acept/cancel buttons in dialog to select multiple products
  - Fields in personal information form
  - Size adjustment of frontpage product lists (use appropiate space when there are fewer products in a list)

### Removed
- All references to deprecated APIs `/public/products` and `/public/categories`
- Some placeholder images

## [v2.0.0] - 2022-01-18

### Changed
- Bumped Angular to v13 [BREAKING CHANGE]
  - IE11 is no longer supported

## [v1.2.2] - 2022-01-12

### Added
- Request confirmation from user before trying to delete any data in the management section

### Fixed
- Image selection dialog issues
  - Filter not working
  - Data not being paginated

### Changed
- Updated localization files

## [v1.2.1] - 2021-12-30

### Fixed
- Issue when trying to add products to cart

## [v1.2.0] - 2021-12-29

### Added
- Support for Product Lists [API v1.2]
  - Include API model, API service, management page and UI form

### Changed
- Frontpage displays existing Product Lists and their contents - instead of fetching 'all' products in existence
- Updated localization files

## [v1.1.2] - 2021-12-26

### Added
- Support for sort pagination parameters [API v1.1.2]
- Support for sorting and pagination in datatables in the management page

### Changed
- Prices and currency values displayed with Angular currency pipe instead of adding a prefix
- Updated localization files

### Fixed
- Creation and general use of categories within local-memory api (such as in, the demo link)
- Issue updating categories due to calling API with wrong query parameters
- Issue opening sales data for edition due to bad template binding

## [v1.1.1] - 2021-12-18

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
  - New Class `Shipper` class with a single `name` property [API v1.0.4]
- UI/UX
  - Manipulation of shippers
  - Manipulation of a product's category
  - Manipulation of all product categories through a tree view
    - Route added to the Management sidenav
    - This tree works on the assumption that categories are identified by a string property named `code`

### Changed
- API models
  - `Image` - add `code` property [API v1.0.4]
  - `Person` - split `name` property into two: `lastName` and `firstName` [API v1.1.0]
  - `ReceiptDetail` - add `unitValue` property [API v1.1.1]
  - `Receipt`
    - Add properties `token`, `taxValue`, `transportValue`, `totalValue`, `totalItems` [API v1.1.1]
    - `totalValue` will replace `amount`; make the former required and the latter optional [API v1.1.1]
      - `amount` will be removed in future versions
  - `ProductCategory` - changed type of `code` from number to string [API v.1.2]
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
