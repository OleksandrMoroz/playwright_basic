import { test, expect } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";
import { LoginPage } from "../../page-objects/LoginPage";
import { OnlineBankingPage } from "../../page-objects/OnlineBankingPage";
import { PayBillsPage } from "../../page-objects/PayBills";

test.describe("Validation function pay bills", () => {
    let homePage: HomePage
    let loginPage: LoginPage
    let onlineBankingPage: OnlineBankingPage
    let payBillsPage: PayBillsPage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        onlineBankingPage = new OnlineBankingPage(page)
        payBillsPage = new PayBillsPage(page)

        await homePage.visit()
        await homePage.clickSigninBtn()
        await loginPage.login('username','password')
        await homePage.refreshHomePage()
    })

    test("Validation successfully payment", async ({ page }) => {
        await homePage.clickOnlineBankin()
        await onlineBankingPage.clickPayBills()
        await payBillsPage.createPayment('apple', '6')
        await payBillsPage.clickBtnDetails()

        await payBillsPage.assertAccountId('48944145651315')

        await payBillsPage.enterAmountSp('600')
        await payBillsPage.enterDateCalendar('2023-07-19')
        await payBillsPage.enterDescription('some text for test')
        await payBillsPage.clickBtnPay()

        await payBillsPage.assertAlertMsg('The payment was successfully submitted.')
    })

    test("Purchase foreign currency cash test",async (page) => {
        await homePage.clickOnlineBankin()
        await onlineBankingPage.clickPayBills()
        await payBillsPage.clickBtnForeignCurrency()

        await payBillsPage.selectCurrency('CHF')
        await payBillsPage.enterAnountPc('600')
        await payBillsPage.clickSelectedRadioBtn()
        await payBillsPage.clickCalculateCoastBtn()
        await payBillsPage.clickBtnPurchase()

        await payBillsPage.assertSuccesPurchasedMsg('Foreign currency cash was successfully purchased.')
    })
})