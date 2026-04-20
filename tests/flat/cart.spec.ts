/**
 * Part I — Flat tests (no POM)
 * Test suite: Add Books to Shopping Cart
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
import { CartPage } from '../../pages/CartPage';

test.describe.configure({ mode: 'serial' });

let page: Page;
let homePage: HomePage;
let cartPage: CartPage;
let basketSumOfTwo = 0;

test.describe('Add Books to Shopping Cart', () => {

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

  test('Test search by keyword', async () => {
    await homePage.searchByKeyword('harry potter');
    await homePage.verifyResultsCountMoreThan(1);
  }); 

  test('Test add book to cart', async () => {
    await homePage.addToCartByIndex(0);
    await homePage.verifyAddToCartMessage();
    await homePage.verifyCartCount(1);
    await homePage.goBackFromCart();
  }); 

  test('Test add second book to cart', async () => {
    await homePage.addToCartByIndex(5);
    await homePage.verifyAddToCartMessage();
    await homePage.verifyCartCount(2);
  }); 

  test('Test cart count and sum is correct', async () => {
    cartPage = await homePage.openShoppingCart();
    await cartPage.verifyCartCount(2);

    basketSumOfTwo = await cartPage.getBasketSum();
    const basketSumTotal = await cartPage.getBasketSumTotal();

    expect(basketSumTotal).toBeCloseTo(basketSumOfTwo, 2);
  }); 


  test('Test remove item from cart and counter sum is correct', async () => {
    await cartPage.removeItemByIndex(0);
    await cartPage.verifyCartCount(1);

    const basketSumOfOne = await cartPage.getBasketSum();
    const basketSumTotal = await cartPage.getBasketSumTotal();
    
    expect(basketSumTotal).toBeCloseTo(basketSumOfOne, 2);
    expect(basketSumOfOne).toBeLessThan(basketSumOfTwo);
  });

}); 
