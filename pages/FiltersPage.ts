import { Page } from '@playwright/test';

export class FiltersPage {
  readonly page: Page;

  private readonly baseUrl = 'https://www.kriso.ee/cgi-bin/shop/searchbooks.html';
  private readonly guitarUrl = `${this.baseUrl}?database=musicsales&instrument=Guitar`;
  private readonly guitarEnglishUrl = `${this.baseUrl}?instrument=Guitar&mlanguage=English&database=musicsales`;
  private readonly guitarEnglishCdUrl = `${this.baseUrl}?mlanguage=English&format=CD&instrument=Guitar&database=musicsales`;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://www.kriso.ee');
    await this.acceptCookies();
  }

    async acceptCookies() {
    const cookieBtn = this.page.getByRole('button', { name: /nõustun|accept/i }).first();
    try {
      await cookieBtn.waitFor({ state: 'visible', timeout: 3000 });
      await cookieBtn.click();
    } catch {
    }
  }

  async openGuitarResults() {
    await this.page.goto(this.guitarUrl);
  }

  async openEnglishGuitarResults() {
    await this.page.goto(this.guitarEnglishUrl);
  }

  async openEnglishCdGuitarResults() {
    await this.page.goto(this.guitarEnglishCdUrl);
  }

  async getProductCount() {
    return this.page.locator('.list-item').count();
  }
}