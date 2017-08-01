import { NotAnAppPage } from './app.po';

describe('not-an-app App', () => {
  let page: NotAnAppPage;

  beforeEach(() => {
    page = new NotAnAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
