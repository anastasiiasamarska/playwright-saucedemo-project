import { Page } from '@playwright/test';

export class LoginPage {

constructor(private page: Page) {}

username = this.page.locator('#user-name');
password = this.page.locator('#password');
loginButton = this.page.locator('#login-button');

async login(user: string, pass: string) {
await this.username.fill(user);
await this.password.fill(pass);
await this.loginButton.click();
}

}