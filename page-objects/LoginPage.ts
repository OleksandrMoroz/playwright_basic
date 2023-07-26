import { Page, expect, Locator } from '@playwright/test'
import { AbstractPage } from './components/AbstractPage'

export class LoginPage extends AbstractPage {
    //Define selectors
    private readonly usernameInput: Locator
    private readonly passwordInput: Locator
    private readonly submitButton: Locator
    private readonly errorMsg: Locator
    private readonly loginForm: Locator

    //Init selectors use constructor
    constructor(page: Page) {
        super(page)
        this.usernameInput = page.locator('#user_login')
        this.passwordInput = page.locator('#user_password')
        this.submitButton = page.locator("//input[@name='submit']")
        this.errorMsg = page.locator('.alert-error')
        this.loginForm = page.locator('#login_form')
    }

    //Difine login page methods
    async login(username: string, password: string) {
        await this.usernameInput.type(username)
        await this.passwordInput.type(password)
        await this.wait(3000)
        await this.submitButton.click()
    }

    async assertErrorMsg() {
        await expect(this.errorMsg).toBeVisible
        await expect(this.errorMsg).toContainText('Login and/or password are wrong.')
    }

    // async snapshotLoginForm() {
    //     await expect(this.loginForm.screenshot()).toMatchSnapshot("login-form.png")
    // }

    // async snapshotErrorMsg() {
    //     await expect(this.errorMsg.screenshot()).toMatchSnapshot("login-error-msg.png")
    // }
    
    async snapshotLoginForm() {
        const screenshot = await this.loginForm.screenshot();
        expect(screenshot).toMatchSnapshot("login-form.png");
    }
    
    async snapshotErrorMsg() {
        const screenshot = await this.errorMsg.screenshot();
        expect(screenshot).toMatchSnapshot("login-error-msg.png");
    }
}