import { test, expect } from "@playwright/test";
import { LoginPage } from "../../page-objects/LoginPage";
import { HomePage } from "../../page-objects/HomePage";

test.describe("Login page suite", () => {
    let loginpage: LoginPage
    let homePage: HomePage

    test.beforeEach(async ({ page }) => {
        loginpage = new LoginPage(page)
        homePage = new HomePage(page)

        await homePage.visit()
    })
    test("Invalid username and password", async ({ page }) => {
        await homePage.clickSigninBtn()
        await loginpage.login('invalidUsername', 'invalidPassword')
        await loginpage.assertErrorMsg()
    })

    test("Valid username and password", async ({ page }) => {
        await homePage.clickSigninBtn()
        await loginpage.login('username', 'password')
        await homePage.refreshHomePage()

        await homePage.checkUserIcon('username')
    })
})
