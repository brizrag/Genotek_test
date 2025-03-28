import { test, expect } from '@playwright/test';
import { allure } from "allure-playwright";
import { Cupon } from '@lk_pages/cupon';

test.describe.configure({ mode: 'parallel', retries: 1 });

let page: any;
let cupon: Cupon;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterEach(async ({}, testInfo) => {
  // Runs after each test and save url on failure.
  if (testInfo.status === 'failed' || testInfo.status === 'passed') {
    const page_url = page.url();
    let page_path = page_url.replace('https://basket.genotek.ru', '');
    page_path = page_path.replace(/\?.*/, '')
    allure.link({ url: page_path, name: "execution_point" });
  }
});

test.afterAll(async () => {
  await page.close();
});


test.beforeEach(async () => {
  cupon = new Cupon(page);
  await cupon.goto(); 
  await cupon.addHeritage(); 
});


test('Тест на добавление товара и применение промокода', async () => {
  await cupon.addPromo(); 

  const originalPrice = await cupon.getOriginalPrice();
  const discountedPrice = await cupon.getDiscountedPrice();

  expect(discountedPrice).toBeLessThan(originalPrice);
  
  expect(discountedPrice).toBeGreaterThan(0);
});
