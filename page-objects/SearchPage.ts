import { Page, expect, Locator } from "@playwright/test";
import { AbstractPage } from "./components/AbstractPage";

export class SearchPage extends AbstractPage {

    readonly numbOfLinks: Locator

    constructor(page: Page) {
        super(page)
        this.numbOfLinks = page.locator('li > a')
    }

    async assertResult(countUrl: number) {
        await expect(this.numbOfLinks).toHaveCount(countUrl)
    }
}