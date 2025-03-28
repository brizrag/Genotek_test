import { test, expect, Locator, Page } from '@playwright/test';

export class Cupon {
    readonly page: Page;
    readonly AddPromocode: Locator;
    readonly OriginalPriceText: Locator;
    readonly DiscountedPriceText: Locator;
    readonly PromocodeWindow: Locator;
    readonly PromoInn: Locator;
    readonly AddHeritageStore: Locator;

    constructor(page: Page) {
        this.page = page;
        this.AddPromocode = page.locator('.basket-promo-code__input');
        this.OriginalPriceText = page.locator('div.basket-order__bill-price:nth-child(1)');
        this.DiscountedPriceText = page.locator('div.basket-order__bill-price:nth-child(2) > priceroller:nth-child(1)');
        this.PromocodeWindow = page.locator('.basket-promo-code__label');
        this.PromoInn = page.locator('.basket-order__report-btn');
        this.AddHeritageStore = page.locator('div.swiper-slide:nth-child(1) > div:nth-child(1) > div:nth-child(2) > a:nth-child(2)');
    }

    async goto() {
        await this.page.goto('https://basket.genotek.ru/');
    }

    async addHeritage() {
        await this.AddHeritageStore.click();
    }

    async addPromo() {
        await this.PromocodeWindow.click(); 
        await this.AddPromocode.fill('genotek5');  
        await this.PromoInn.click(); 
    }

    async getOriginalPrice() {
        const originalPriceText = await this.OriginalPriceText.innerText();
        if (!originalPriceText) {
            throw new Error('Original price text is empty or not found.');
        }
        return parseFloat(originalPriceText.replace(/[^0-9.-]+/g, ""));
    }

    async getDiscountedPrice() {
        const discountedPriceText = await this.DiscountedPriceText.innerText();
        if (!discountedPriceText) {
            throw new Error('Discounted price text is empty or not found.');
        }
        return parseFloat(discountedPriceText.replace(/[^0-9.-]+/g, ""));
    }
}
