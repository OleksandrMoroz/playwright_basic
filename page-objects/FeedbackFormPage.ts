import { Page, expect, Locator } from "@playwright/test";
import { AbstractPage } from "./components/AbstractPage";

export class FeedBackPage extends AbstractPage{
    private readonly getNameField: Locator
    private readonly getEmailField: Locator
    private readonly getSubjectField: Locator
    private readonly getCommentField: Locator
    private readonly getBtnClear: Locator
    private readonly getBtnSentForm: Locator
    private readonly getFeedbackTitle: Locator

    constructor(page: Page) {
        super(page)
        this.getNameField = page.locator('#name')
        this.getEmailField = page.locator('#email')
        this.getSubjectField = page.locator('#subject')
        this.getCommentField = page.locator('#comment')
        this.getBtnClear = page.locator("input[value='Clear']")
        this.getBtnSentForm = page.locator("input[value='Send Message']")
        this.getFeedbackTitle = page.locator('#feedback-title')
    }

    async fieldFeedbackForm(
        name: string,
        email: string,
        subject: string,
        comment: string
    ) {
        await this.getNameField.type(name)
        await this.getEmailField.type(email)
        await this.getSubjectField.type(subject)
        await this.getCommentField.type(comment)
    }

    async clickClearBtn() {
        await this.getBtnClear.click
    }

    async clickSentFeedback() {
        await this.getBtnSentForm.click
    }

    async assertFieldIsEmpty() {
        await expect(this.getNameField).toBeEmpty
        await expect(this.getSubjectField).toBeEmpty
    }

    async assertFeedbackTitle(toContainText: string){
        await expect(this.getFeedbackTitle).toBeVisible
        await expect(this.getFeedbackTitle).toContainText(toContainText)
    }
}