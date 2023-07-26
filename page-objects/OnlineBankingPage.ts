import { Page, expect, Locator } from "@playwright/test";
import { AbstractPage } from "./components/AbstractPage";

export class OnlineBankingPage extends AbstractPage {
    private readonly getBtnPayBills: Locator
    private readonly getBtnTransferFunds: Locator
    private readonly getAccountActivity: Locator

    constructor(page: Page) {
        super(page)
        this.getBtnPayBills = page.locator('#pay_bills_link')
        this.getBtnTransferFunds = page.locator('#transfer_funds_link')
        this.getAccountActivity = page.locator('#account_activity_link')
    }

    async clickPayBills() {
        await this.getBtnPayBills.click()
    }
    async clickTransferFunds() {
        await this.getBtnTransferFunds.click()
    }

    async clickAccountActivity() {
        await this.getAccountActivity.click
    }
}