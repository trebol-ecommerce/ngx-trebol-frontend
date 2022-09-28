# Contribution Guidelines

So you want to help with the development of Trébol? Thanks so much! Please, follow guidance as described in this file.

These are not mandatory rules, but if you want your contributions to be accepted eagerly, it is better to follow them as good as you can.

__If you have any questions, don't hesitate to contact [@bglamadrid (me)](https://github.com/bglamadrid) for it.__

## Where is help needed? 🤔

- [Try the live demo](https://trebol-ecommerce.github.io/ngx-trebol-frontend/), see if you have any suggestions or find anything wrong with it
- Improve existing documentation
  - Suggest or submit better contribution guidelines
  - This codebase is basically documented through JSDoc comments and test units
- See the _Issues_ section to find technical work that needs doing. Most of these tasks relate to:
  - Writing code to comply with newer backend REST API
    - Compare [the current frontend version](https://github.com/trebol-ecommerce/ngx-trebol-frontend/blob/main/package.json#L3) against [the current API version](https://github.com/trebol-ecommerce/api/blob/main/trebol-api.json#L5) and their respective changelogs
  - Adding new client-side functionality
  - Improving user experience and accesibility
  - Finding code that is worth improving, be it about performance, readability, or else
- Translate the application to more languages; please read the [Angular guide on working with translation files](https://angular.io/guide/i18n-common-translation-files) so you know how to proceed

## Submitting issues 💡

- Before submitting an issue, _please_ do search in the current issues list to prevent creating duplicates
  - Remember you can also join the discussion of an ongoing issue; if you have anything to say, _please_ don't hesitate
- Your issues should relate __at least__ to one of the following subjects, and they should include certain basic information based on them:
  - `bug` - explain the expected behavior vs the resulting behavior; include a description of the procedure you used to replicate the problem
  - `feature` - explain the functionality that you wish to add or see added
  - `enhancement` - explain the functionality you wish to improve or see improved, and what aspects of the application would be affected
  - `tests` - submit one or more unit tests, or a group of mutually dependant unit tests, per issue
  - `refactor`, `documentation` or `i18n` - briefly explain the changes and/or additions you want to introduce or see introduced
- Specificity is not a requirement, but __it is appreciated__
  - Include the expected outcome of working on the issue, or an approximation
  - Declare some steps to be followed: if possible, try to divide your issue into a logical sequence of tasks
  - Indicate the use case you're expecting to cover, such as "clicking the login button when the user has not typed their password in"
- Use markdown to your advantage
  - Adding some headings goes a long way in structuring your text; rich text structure makes it easier for everyone to read and follow up with your train of thought

## Working on issues 🔬

- If you want to to work on an issue, request that it is assigned to you beforehand.
- If you are assigned to, and for some reason can't or don't want to go on with something, be it an issue or a pull request, please let me know. It's okay to stop and take breaks when necessary. But most importantly, transparency and honesty in these matters are appreciated.

## Submitting pull requests ⚗️

- Make sure you describe your changes in the `CHANGELOG.md` file
  - Try to keep it simple and concise.
  - __Do not__ add excessively technical info about the changes, like filenames or line numbers.
    - If you need to do that, you can add comments within the GitHub web interface.
  - You can, and are encouraged to, give yourself authorship of your changes.
