import { Page, expect, Locator } from "@playwright/test";
import { AbstractPage } from "./components/AbstractPage";

export class AccountActivityPage extends AbstractPage {
    private readonly accountSelector: Locator
    private readonly getUrlCount: Locator
    private readonly noResultUrl: Locator

    constructor(page: Page) {
        super(page)
        this.accountSelector = page.locator('#aa_accountId')
        this.getUrlCount = page.locator('#all_transactions_for_account tbody tr')
        this.noResultUrl = page.locator('.well')
    }

    async selectYourAccount(yourAcc: string) {
        await this.accountSelector.selectOption(yourAcc)
    }

    async assertCountUrl(urlCount: number) {
        await expect(this.getUrlCount).toHaveCount(urlCount)
    }

    async assertNoUrl(msg: string) {
        await expect(this.noResultUrl).toContainText(msg)
    }
}