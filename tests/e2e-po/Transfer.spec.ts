import { test, expect } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";
import { LoginPage } from "../../page-objects/LoginPage";
import { OnlineBankingPage } from "../../page-objects/OnlineBankingPage";
import { TransferPage } from "../../page-objects/TransferPage";


test.describe('Transfer funds and Make Payments', async () => {
    let homePage: HomePage
    let loginPage: LoginPage
    let onlineBankingPage: OnlineBankingPage
    let transferPage: TransferPage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        onlineBankingPage = new OnlineBankingPage(page)
        transferPage = new TransferPage(page)

        await homePage.visit()
        await homePage.clickSigninBtn()
        await loginPage.login('username', 'password')
        await homePage.refreshHomePage()
    })
    test('Succes transfer', async ({ page }) => {
        await homePage.clickOnlineBankin()
        await onlineBankingPage.clickTransferFunds()

        await transferPage.selectFromAccount('3')
        await transferPage.selectToAccount('4')
        await transferPage.enterAmountTf('600')
        await transferPage.enterDescriptionTf('some text for test')
        await transferPage.clickSubmitBtn()

        await transferPage.assertBoardContent('Submit')

        await transferPage.clickSubmitBtn()

        await transferPage.assertSuccesTransferMsg('You successfully submitted your transaction.')
    })
})