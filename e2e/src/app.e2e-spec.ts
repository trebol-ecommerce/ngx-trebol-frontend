/**
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { browser, logging } from 'protractor';
import { AppPage } from './app.po';

describe('Trebol Angular', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should render a router-outlet', () => {
    page.navigateTo();
    expect(page.hasRouterOutlet()).toEqual(true);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
