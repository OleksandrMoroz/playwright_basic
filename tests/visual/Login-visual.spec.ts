import { test } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";
import { LoginPage } from "../../page-objects/LoginPage";

test.describe("Login page Visual Test", async () => {
    let homePage: HomePage
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        await homePage.visit()
        await homePage.clickSigninBtn()
    })

    test("Login Form", async ({ page }) => {
        await loginPage.snapshotLoginForm()
    })

    test("Snapshot error msg",async ({page}) => {
        await loginPage.login('not for you', 'lol pass')
        await loginPage.snapshotErrorMsg()
    })
})
