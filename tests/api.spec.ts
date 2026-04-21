import { test, expect } from '@playwright/test';

test('TC-API-01 Response Logic Validation', async ({ request }) => {

const response = await request.get(
'https://demo.playwright.dev/api-mocking/api/v1/fruits'
);

expect(response.status()).toBe(200);

const body = await response.json();

const pear = body.find((fruit: any) => fruit.name === 'Pear');

expect(pear).toBeTruthy();
expect(pear.id).toBe(4);

});


test('TC-API-02 Negative Validation', async ({ request }) => {

const response = await request.get(
'https://demo.playwright.dev/api-mocking/api/v1/fruits'
);

expect(response.status()).toBe(200);

const body = await response.json();

const bodyString = JSON.stringify(body).toLowerCase();

expect(bodyString).not.toContain('chicken');

});