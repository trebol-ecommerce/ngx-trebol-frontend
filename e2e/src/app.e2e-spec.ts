import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('Ferme Web App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('deberia tener un contenedor visual de navegacion (router outlet)', () => {
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
