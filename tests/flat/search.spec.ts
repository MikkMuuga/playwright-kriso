/**
 * Part I — Flat tests (no POM)
 * Test suite: Search for Books by Keywords
 *
 * Rules:
 *   - Use only: getByRole, getByText, getByPlaceholder, getByLabel
 *   - No CSS class selectors, no XPath
 *
 * Tip: run `npx playwright codegen https://www.kriso.ee` to discover selectors.
 */
import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe.configure({ mode: 'serial' });

let page: Page;
let homePage: HomePage;

test.describe('Search for Books by Keywords', () => {

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();

    homePage = new HomePage(page);

    await homePage.openUrl();
    await homePage.acceptCookies();
  });

  test.afterAll(async () => {
    await page.context().close();
  });

  test('Test logo is visible', async () => {
    await homePage.verifyLogo();
  });

  test('Test no products found', async () => {
    await homePage.searchByKeyword('jaslkfjalskjdkls');
    await homePage.verifyNoProductsFoundMessage();
  });

  test('Test search results contain keyword', async () => {
    await homePage.searchByKeyword('tolkien');
    await homePage.verifyResultsCountMoreThan(1);

    //TODO check results contain keyword
  });

  test('Test search by ISBN', async () => {
    await homePage.searchByKeyword('9780307588371');

    //TODO check correct book is shown
  });

});
