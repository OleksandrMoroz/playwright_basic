import { HomePage } from "../../page-objects/HomePage";
import { SearchPage } from "../../page-objects/SearchPage";
import { test, expect } from "@playwright/test";

test.describe("Search field scenario", () => {
    let homePage: HomePage
    let searchPage: SearchPage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        searchPage = new SearchPage(page)

        await homePage.visit()
    })
    test("Validation search bar", async ({ page }) => {
        await homePage.typeSearchFiled('Bank')

        await searchPage.assertResult(2)
    })
})