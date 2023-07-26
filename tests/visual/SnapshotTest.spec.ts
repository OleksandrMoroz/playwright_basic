import { test, expect } from "@playwright/test";

test.describe("Visual Regression Testing", () => {
    test("Full Page Snapshots", async ({ page }) => {
        await page.goto('https://example.com/')

        expect(await page.screenshot()).toMatchSnapshot("Home.png")
    })

    test("Single Element Screenshot", async ({page}) => {
        await page.goto('https://example.com/')
        
        const singleElement = await page.$('h1')
        expect(await singleElement?.screenshot()).toMatchSnapshot("pageTitle.png")
    })
})