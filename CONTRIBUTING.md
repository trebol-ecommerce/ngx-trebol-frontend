# Contributing Guidelines

So you want to help with the development of Trébol? Thanks so much!
Please follow guidance as described in this file. These are not mandatory rules, but if you
want your contributions to be accepted eagerly, it is better to follow them as good as you can.

__If you have any questions, don't hesitate to contact [@bglamadrid (me)](https://github.com/bglamadrid) for it.__


## Where is help needed?

- [Try the live demo](https://trebol-ecommerce.github.io/ngx-trebol-frontend/), see if you have any suggestions or find anything wrong with it
- See the _Issues_ section to find work that needs doing. Most of it can be categorized in:
  - Write code for compatibility with the newer REST API
    - You can compare the [the current frontend version](https://github.com/trebol-ecommerce/ngx-trebol-frontend/blob/main/package.json#L3) VS [the current API version](https://github.com/trebol-ecommerce/ngx-trebol-frontend/blob/main/package.json#L3) and their respective changelogs
  - Improve existing documentation
    - This codebase is mostly documented through JSDoc comments
    - Suggest or submit better contribution guidelines
  - Find code worth improving, performance-wise or clarity-wise
  - Translate the application to more languages. Please read the [Angular guide on working with translation files](https://angular.io/guide/i18n-common-translation-files) so you know how to proceed


## Submitting issues

- Before submitting an issue, make sure it is not already open and present in there
- Your issues should indicate at least one of the following labels, and include certain basic information:
  - `bug` - explain the expected behavior vs the resulting behavior; include a description of the procedure you used to replicate the problem
  - `feature` - explain the functionality that you wish to add
  - `enhancement` - explain the functionality you wish to improve, and what aspects should be improved
  - `tests` - try to submit one (1) unit test, or a group of mutually dependant unit tests, per issue
  - `refactor`, `documentation` or `i18n` - briefly explain the changes and/or additions you want to introduce
- Specificity is always appreciated. Include anything you can into your issue, such as:
  - The expected outcome of working on it, whether you know what will be achieved or you just have an idea of said outcome
  - Steps to be followed. If possible, try to divide your issue so that progress can be tracked transparently.
- Use markdown to your advantage and use simple rules to format your text so it's easy to read
  - For example, use headings to separate a summary from the more specific information


## Working on issues

- If you want to to work on an issue, request that it is assigned to you beforehand.
- If you are assigned to, and for some reason can't or don't want to go on with something, be it an issue or a pull request, please let me know. It's okay to stop and  take breaks when necessary. But most importantly, transparency and honesty in these matters are appreciated.


## Submitting pull requests

- Make sure you describe your changes in the `CHANGELOG.md` file
  - Try to keep it simple and concise.
  - __Do not__ add excessively technical info about the changes, like filenames or line numbers.
  - If you need to do that, you can add comments within the GitHub web interface.
  - You can give yourself authorship of your changes.
