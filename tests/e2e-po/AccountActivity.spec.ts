import { test, expect } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";
import { LoginPage } from "../../page-objects/LoginPage";
import { OnlineBankingPage } from "../../page-objects/OnlineBankingPage";
import { AccountActivityPage } from "../../page-objects/AccountActivityPage";


test.describe('Transfer funds and Make Payments', async () => {
    let homePage: HomePage
    let loginPage: LoginPage
    let onlineBankingPage: OnlineBankingPage
    let accountActivityPage: AccountActivityPage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        onlineBankingPage = new OnlineBankingPage(page)
        accountActivityPage = new AccountActivityPage(page)

        await homePage.visit()
        await homePage.clickSigninBtn()
        await loginPage.login('username', 'password')
        await homePage.refreshHomePage()
    })
    test("URL Validation",async ({page}) => {
        await homePage.clickOnlineBankin()
        await onlineBankingPage.clickAccountActivity()

        await accountActivityPage.selectYourAccount('2')

        await accountActivityPage.assertCountUrl(3)

        await accountActivityPage.selectYourAccount('4')

        await accountActivityPage.assertCountUrl(2)

        await accountActivityPage.selectYourAccount('6')

        await accountActivityPage.assertNoUrl('No results.')
    })
})