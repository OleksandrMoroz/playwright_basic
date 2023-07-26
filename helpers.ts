import { expect } from "@playwright/test"

export async function loadHomePage(page) {
    await page.goto('https://example.com/')
}

export async function zeroSignIn(page) {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#signin_button')
    await page.type('#user_login', 'username')
    await page.type('#user_password', 'password')
    await page.click("input[value='Sign in']")
    await page.goto('http://zero.webappsecurity.com/')
}

export async function assertTitle(page) {
    await page.waitForSelector('h5')
}