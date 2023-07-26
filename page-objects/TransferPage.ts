import { Page, expect, Locator } from "@playwright/test";
import { AbstractPage } from "./components/AbstractPage";

export class TransferPage extends AbstractPage{
    private readonly fromAccountSelect: Locator
    private readonly toAccountSelect: Locator
    private readonly getAmountTfField: Locator
    private readonly getDescriptionTf: Locator
    private readonly getSubmitBtn: Locator
    private readonly getBoardContent: Locator
    private readonly getAlertMsg: Locator

    constructor(page: Page) {
        super(page)
        this.fromAccountSelect = page.locator('#tf_fromAccountId')
        this.toAccountSelect = page.locator('#tf_toAccountId')
        this.getAmountTfField = page.locator('#tf_amount')
        this.getDescriptionTf = page.locator('#tf_description')
        this.getSubmitBtn = page.locator('#btn_submit')
        this.getBoardContent = page.locator("div[class='board-content'] p")
        this.getAlertMsg = page.locator('.alert.alert-success')
    }

    async selectFromAccount(fromAcc: string) {
        await this.fromAccountSelect.type(fromAcc)
    }

    async selectToAccount(toAcc: string) {
        await this.toAccountSelect.type(toAcc)
    }

    async enterAmountTf(amount: string) {
        await this.getAmountTfField.type(amount)
    }

    async enterDescriptionTf(description: string) {
        await this.getDescriptionTf.type(description)
    }

    async clickSubmitBtn() {
        await this.getSubmitBtn.click()
    }

    async assertBoardContent(text: string) {
        await expect(this.getBoardContent).toContainText(text)
    }

    async assertSuccesTransferMsg(msgText: string) {
        await expect(this.getAlertMsg).toContainText(msgText)
    }
}