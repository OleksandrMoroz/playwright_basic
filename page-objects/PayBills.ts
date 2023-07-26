import { Page, expect, Locator } from "@playwright/test";
import { AbstractPage } from "./components/AbstractPage";

export class PayBillsPage extends AbstractPage {

    private readonly getPayeeSelector: Locator
    private readonly getAccountSelector: Locator
    private readonly getAmountFieldSp: Locator
    private readonly getCalendar: Locator
    private readonly getDescriptionField: Locator
    private readonly getBtnDetails: Locator
    private readonly getAccountId: Locator
    private readonly getBtnPay: Locator
    private readonly getAlertMsg: Locator
    private readonly getBtnForeignCurrency: Locator
    private readonly getCurrencySelector: Locator
    private readonly getAmountFieldPc: Locator
    private readonly getSelectedRadioBtn: Locator
    private readonly getBtnCalculateCoast: Locator
    private readonly getBtnPurchase: Locator
    private readonly getSucessMsg: Locator

    constructor(page: Page) {
        super(page)
        this.getPayeeSelector = page.locator('#sp_payee')
        this.getAccountSelector = page.locator('#sp_account')
        this.getAmountFieldSp = page.locator('#sp_amount')
        this.getBtnDetails = page.locator('#sp_get_payee_details')
        this.getAccountId = page.locator('#sp_payee_details')
        this.getCalendar = page.locator('#sp_date')
        this.getDescriptionField = page.locator('#sp_description')
        this.getBtnPay = page.locator('#pay_saved_payees')
        this.getAlertMsg = page.locator('#alert_content > span')
        this.getBtnForeignCurrency = page.locator("a[href='#ui-tabs-3']")
        this.getCurrencySelector = page.locator('#pc_currency')
        this.getAmountFieldPc = page.locator('#pc_amount')
        this.getSelectedRadioBtn = page.locator('#pc_inDollars_false')
        this.getBtnCalculateCoast = page.locator('#pc_calculate_costs')
        this.getBtnPurchase = page.locator('#purchase_cash')
        this.getSucessMsg = page.locator('#alert_container')
    }

    async createPayment(payee: string, account: string) {
        await this.getPayeeSelector.selectOption(payee)
        await this.getAccountSelector.selectOption(account)
    }

    async clickBtnDetails() {
        await this.getBtnDetails.click()
    }

    async assertAccountId(containText: string) {
        await expect(this.getAccountId).toContainText(containText)
    }

    async enterAmountSp(amount: string) {
        await this.getAmountFieldSp.type(amount)
    }

    async enterDateCalendar(date: string) {
        await this.getCalendar.type(date)
        await this.page.keyboard.press('Enter')
    }

    async enterDescription(description: string) {
        await this.getDescriptionField.type(description)
    }

    async clickBtnPay() {
        await this.getBtnPay.click()
    }

    async assertAlertMsg(containtText: string) {
        await expect(this.getAlertMsg).toBeVisible
        await expect(this.getAlertMsg).toContainText(containtText)
    }

    async clickBtnForeignCurrency() {
        await this.getBtnForeignCurrency.click()
    }

    async selectCurrency(currency: string) {
        await this.getCurrencySelector.type(currency)
    }

    async enterAnountPc(amount: string) {
        await this.getAmountFieldPc.type(amount)
    }

    async clickSelectedRadioBtn() {
        await this.getSelectedRadioBtn.click()
    }

    async clickCalculateCoastBtn() {
        await this.getBtnCalculateCoast.click()
    }

    async clickBtnPurchase() {
        await this.getBtnPurchase.click()
    }

    async assertSuccesPurchasedMsg(msg: string) {
        await expect(this.getSucessMsg).toBeVisible
        await expect(this.getSucessMsg).toContainText(msg)
    }
}