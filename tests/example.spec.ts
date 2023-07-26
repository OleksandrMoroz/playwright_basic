import { expect, test } from "@playwright/test";

import { loadHomePage, assertTitle } from "../helpers";

test("Simpe basic test", async ({ page }) => {
    await page.goto("https://example.com/")
    const pageTitle = await page.locator('h1')

    await expect(pageTitle).toContainText("Example Domain")
})

test("Click on Elements", async ({ page }) => {
    await page.goto("http://zero.webappsecurity.com/index.html")
    await page.click("#signin_button")
    await page.click("text=Sign in")

    const errorMsg = await page.locator('.alert-error')
    await expect(errorMsg).toContainText("Login and/or password are wrong.")
})

test.describe("My first test suite @testTag", () => {
    test("Working with inputs", async ({ page }) => {
        await page.goto("http://zero.webappsecurity.com/index.html")
        await page.click('#signin_button')

        await page.type('#user_login', 'userName')
        await page.type('#user_password', 'bbnO$')
        await page.click("text=Sign in")

        const errorMsg = await page.locator('.alert-error')
        await expect(errorMsg).toContainText('Login and/or password are wrong.')
    })

    test("Assertions", async ({ page }) => {
        await page.goto('https://example.com/')
        await expect(page).toHaveURL('https://example.com/')
        await expect(page).toHaveTitle('Example Domain')

        const element = await page.locator('h1')
        await expect(element).toBeVisible
        await expect(element).toHaveText('Example Domain')
        await expect(element).toHaveCount(1)

        const nonExistingElement = await page.locator('h5')
        await expect(nonExistingElement).not.toBeVisible
    })
})

test.describe.parallel("Hooks", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://example.com/')
    })

    test("Screenshots", async ({ page }) => {
        await page.screenshot({ path: 'screenshot.png', fullPage: true })
    })

    test("Single element scr", async ({ page }) => {
        const element = await page.$('h1')
        await element?.screenshot({ path: 'single_element_scr.png' })
    })
})

test.skip("Custom Helpers", async ({ page }) => {
    await loadHomePage(page)
    // await page.pause()
    await assertTitle(page)
})