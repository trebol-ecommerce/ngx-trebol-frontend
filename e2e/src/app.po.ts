import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  hasRouterOutlet() {
    return element(by.css('app-root router-outlet')).isPresent() as Promise<boolean>;
  }
}
