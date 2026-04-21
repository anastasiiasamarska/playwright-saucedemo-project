import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import users from '../fixtures/users.json';

test.beforeEach(async ({ page }) => {
await page.goto('https://www.saucedemo.com');
});

test('End to End Purchase Flow', async ({ page }) => {

const login = new LoginPage(page);

await login.login(
users.standard_user.username,
users.standard_user.password
);

await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

await page.locator('.shopping_cart_link').click();

await page.locator('[data-test="checkout"]').click();

await page.locator('[data-test="firstName"]').fill('Test');
await page.locator('[data-test="lastName"]').fill('User');
await page.locator('[data-test="postalCode"]').fill('12345');

await page.locator('[data-test="continue"]').click();

await page.locator('[data-test="finish"]').click();

await expect(page.locator('.complete-header')).toContainText('Thank you for your order!');
});
test('Intentional failure - wrong price', async ({ page }) => {

const login = new LoginPage(page);

await page.goto('https://www.saucedemo.com');

await login.login(
users.standard_user.username,
users.standard_user.password
);

await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

await expect(page.locator('.inventory_item_price')).toHaveText('$7.99');

});
