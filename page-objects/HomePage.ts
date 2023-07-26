import { Page, expect, Locator } from "@playwright/test";
import { AbstractPage } from "./components/AbstractPage";

export class HomePage extends AbstractPage{
    private readonly signInBtn: Locator
    private readonly searchFiled: Locator
    private readonly refreshPage: Page
    private readonly userIcon: Locator
    private readonly getBtnFeedback: Locator
    private readonly getBtnOnlineBanking: Locator

    constructor(page: Page) {
        super(page)
        this.refreshPage = page
        this.signInBtn = page.locator('#signin_button')
        this.userIcon = page.locator("//a[normalize-space()='username']")
        this.searchFiled = page.locator('#searchTerm')
        this.getBtnFeedback = page.locator('#feedback')
        this.getBtnOnlineBanking = page.locator('#onlineBankingMenu')
    }
    async visit() {
        await this.page.goto('http://zero.webappsecurity.com/index.html')
    }

    async refreshHomePage() {
        await this.refreshPage.goto('http://zero.webappsecurity.com/')
    }

    async typeSearchFiled(search: string) {
        await this.searchFiled.type(search)
        await this.page.keyboard.press('Enter')
    }

    async clickBtnFeedback() {
        await this.getBtnFeedback.click()
    }

    async clickSigninBtn() {
        await this.signInBtn.click()
    }

    async clickOnlineBankin() {
        await this.getBtnOnlineBanking.click()
    }

    async checkUserIcon(userName: string) {
        await expect(this.userIcon).toBeVisible()
        await expect(this.userIcon).toContainText(userName)
    }
}
