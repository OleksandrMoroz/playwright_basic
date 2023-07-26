import { test, expect } from "@playwright/test";
import { getRandomNum, getRandomString } from "../../utils/data-helpers";

test.describe("Tips and Trick Section", async () => {
    test.only("Test-Info Object", async ({ page }, testInfo) => {
        await page.goto("https://example.com/")
        // console.log(testInfo.title)
        let newRandomNum = await getRandomNum()
        let newRandomString = await getRandomString()

        console.log(newRandomNum)
        console.log(newRandomString)
    })

    test("Test Skip Browser", async ({ page, browserName }) => {
        test.skip(browserName == 'chromium', 'Feature not ready for Chrome')
        await page.goto('https://example.com/')
    })

    test("Test Fixme Annotation", async ({ page, browserName }) => {
        test.skip(browserName == 'chromium', 'Test not stable, need some fix')
        await page.goto('https://example.com/')
    })

    const people = ['Mike', 'Bobby', 'Elisa', 'Mark', 'Dony']
    for (const name of people) {
        test.skip(`Running test for${name}`, async ({ page }) => {
            await page.goto('http://zero.webappsecurity.com/index.html')

            await page.type('#searchTerm', `${name}`)
            await page.waitForTimeout(3000)
        })
    }

    test.skip("Mouse movement semulation", async ({ page }) => {
        await page.goto('https://example.com/')

        await page.mouse.move(0, 0)
        await page.mouse.down()
        await page.mouse.move(0, 100)
        await page.mouse.up()
    })

    test.skip('Multiple Browser Tabs inside 1 Browser', async ({ browser }) => {
        const context = await browser.newContext()
        const pageOne = await context.newPage()
        const pageTwo = await context.newPage()
        const pageThree = await context.newPage()

        await pageOne.goto('https://example.com/')
        await pageTwo.goto('https://example.com/')
        await pageThree.goto('https://example.com/')
    })
})