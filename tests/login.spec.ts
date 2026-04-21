import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import users from '../fixtures/users.json';

test.beforeEach(async ({ page }) => {
await page.goto('https://www.saucedemo.com');
});

test('Successful Login', async ({ page }) => {

const login = new LoginPage(page);

await login.login(
users.standard_user.username,
users.standard_user.password
);

await expect(page).toHaveURL(/inventory/);

});
test('Failed Login', async ({ page }) => {
const login = new LoginPage(page);

await page.goto('https://www.saucedemo.com');

await login.login(
users.locked_user.username,
users.locked_user.password
);

await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface');
});