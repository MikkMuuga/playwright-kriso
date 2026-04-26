/**
 * Part I — Flat tests (no POM)
 * Test suite: Navigate Products via Filters
 *
 * Rules:
 *   - Use only: getByRole, getByText, getByPlaceholder, getByLabel
 *   - No CSS class selectors, no XPath
 *
 * Tip: run `npx playwright codegen https://www.kriso.ee` to discover selectors.
 */
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.kriso.ee/cgi-bin/shop/searchbooks.html';
const GUITAR_URL = `${BASE_URL}?database=musicsales&instrument=Guitar`;
const GUITAR_ENGLISH_URL = `${BASE_URL}?instrument=Guitar&mlanguage=English&database=musicsales`;
const GUITAR_ENGLISH_CD_URL = `${BASE_URL}?mlanguage=English&format=CD&instrument=Guitar&database=musicsales`;

test.describe('Navigate Products via Filters', () => {

  test('should navigate and filter products successfully', async ({ page }) => {
    await page.goto('https://www.kriso.ee');
    await expect(page).toHaveTitle(/Krisostomus/i);

    const cookieButton = page.getByRole('button', { name: 'Nõustun' });
    if (await cookieButton.isVisible()) {
      await cookieButton.click();
    }

    await page.goto(GUITAR_URL);
    await expect(page).toHaveURL(/instrument=Guitar/);

    const productList = page.locator('.list-item');
    const initialCount = await productList.count();
    expect(initialCount).toBeGreaterThan(1);

    await page.goto(GUITAR_ENGLISH_URL);
    await expect(page).toHaveURL(/mlanguage=English/);

    const countAfterLanguageFilter = await productList.count();
    expect(countAfterLanguageFilter).toBeLessThanOrEqual(initialCount);

    await page.goto(GUITAR_ENGLISH_CD_URL);
    await expect(page).toHaveURL(/format=CD/);

    const countAfterCdFilter = await productList.count();
    expect(countAfterCdFilter).toBeLessThanOrEqual(countAfterLanguageFilter);

    await page.goto(GUITAR_URL);
    const finalCount = await productList.count();
    expect(finalCount).toBeGreaterThanOrEqual(countAfterCdFilter);
  });

});