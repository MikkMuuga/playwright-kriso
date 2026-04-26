/**
 * Part II — Page Object Model tests
 * Test suite: Navigate Products via Filters
 *
 * Rules:
 *   - No raw selectors in test files — all locators live in page classes
 *   - Use only: getByRole, getByText, getByPlaceholder, getByLabel
 */
import { test, expect } from '@playwright/test';
import { FiltersPage } from '../../pages/FiltersPage';

test.describe('Navigate Products via Filters (POM)', () => {

  test('should navigate and filter products', async ({ page }) => {
    const filtersPage = new FiltersPage(page);

    await filtersPage.navigate();
    await expect(page).toHaveTitle(/Krisostomus/i);

    await filtersPage.openGuitarResults();
    await expect(page).toHaveURL(/instrument=Guitar/);

    const initialCount = await filtersPage.getProductCount();
    expect(initialCount).toBeGreaterThan(1);

    await filtersPage.openEnglishGuitarResults();
    await expect(page).toHaveURL(/mlanguage=English/);

    const countAfterLanguageFilter = await filtersPage.getProductCount();
    expect(countAfterLanguageFilter).toBeLessThanOrEqual(initialCount);

    await filtersPage.openEnglishCdGuitarResults();
    await expect(page).toHaveURL(/format=CD/);

    const countAfterCdFilter = await filtersPage.getProductCount();
    expect(countAfterCdFilter).toBeLessThanOrEqual(countAfterLanguageFilter);

    await filtersPage.openGuitarResults();
    const finalCount = await filtersPage.getProductCount();
    expect(finalCount).toBeGreaterThanOrEqual(countAfterCdFilter);
  });

});