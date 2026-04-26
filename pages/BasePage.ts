import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  protected readonly logo: Locator;
  protected readonly consentButton: Locator;
  protected readonly searchInput: Locator;
  protected readonly searchButton: Locator;

  constructor(protected page: Page) {
    this.logo = this.page.locator('.logo-icon');
    this.consentButton = this.page.getByRole('button', { name: /nõustun|accept/i });
    this.searchInput = this.page.locator('#top-search-text');
    this.searchButton = this.page.locator('#top-search-btn-wrap');
  }

    async acceptCookies() {
    const cookieButton = this.consentButton.first();
    try {
      await cookieButton.waitFor({ state: 'visible', timeout: 3000 });
      await cookieButton.click();
    } catch {
    }
  }

  async verifyLogo() {
    await expect(this.logo).toBeVisible();
  }

  async searchByKeyword(keyword: string) {
    await this.searchInput.click();
    await this.searchInput.fill(keyword);
    await this.searchButton.click();
  }
}
