import { test, expect } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";
import { FeedBackPage } from "../../page-objects/FeedbackFormPage";

test.describe("Validation feedback form", () => {
    let homePage: HomePage
    let feedback: FeedBackPage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        feedback = new FeedBackPage(page)

        await homePage.visit()
    })
    test("Clear all fields feedback form", async ({ page }) => {
        await homePage.clickBtnFeedback()

        await feedback.fieldFeedbackForm
            (
                'Oleksandr',
                'testMail@email.com',
                'some test text',
                'some commet for test'
            )

        await feedback.clickClearBtn()

        await feedback.assertFieldIsEmpty()
    })

    test("Sent feedback form", async ({ page }) => {
        await homePage.clickBtnFeedback()
        await feedback.fieldFeedbackForm
            (
                'Oleksandr',
                'testMail@email.com',
                'some test text',
                'some commet for test'
            )

        await feedback.clickSentFeedback()

        await feedback.assertFeedbackTitle('Feedback')
    })
})