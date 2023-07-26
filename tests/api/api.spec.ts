import { test, expect } from "@playwright/test";

test.describe.parallel("API Testing", () => {
    const baseURL = 'https://reqres.in/api'

    test("Simple API Test - Assert Response ", async ({ request }) => {
        const response = await request.get(`${baseURL}/users/2`)
        expect(response.status()).toBe(200)

        const responseBody = JSON.parse(await response.text())
        // console.log(responseBody)
    })
    test("Invalid endpoint", async ({ request }) => {
        const response = await request.get(`${baseURL}/users/wrong-endpoint`)
        expect(response.status()).toBe(404)
    })
    test("GET Request - GET Response data", async ({ request }) => {
        const response = await request.get(`${baseURL}/users/2`)
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)

        // console.log(responseBody)
        expect(responseBody.data.id).toBe(2)
        expect(responseBody.data.first_name).toBe('Janet')
        expect(responseBody.data.last_name).toBe('Weaver')
        expect(responseBody.data.email).toBeTruthy()
    })

    test("POST - Create new user", async ({ request }) => {
        const response = await request.post(`${baseURL}/users`, {
            data: {
                id: 997,
                name: "Kilo",
                job: "leader"
            }
        })
        expect(response.status()).toBe(201)

        const responseBody = JSON.parse(await response.text())
        // console.log(responseBody)

        expect(responseBody.id).toBe(997)
        expect(responseBody.name).toBe('Kilo')
        expect(responseBody.job).toBe('leader')
    })
    test("POST - Login Pass", async ({ request }) => {
        const response = await request.post(`${baseURL}/login`, {
            data: {
                email: "eve.holt@reqres.in",
                password: "cityslicka"
            }
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)

        // console.log(responseBody)
        expect(responseBody.token).toBeTruthy
        expect(responseBody.token).toBe('QpwL5tke4Pnpja7X4')
    })

    test("POST - Login Fail", async ({ request }) => {
        const response = await request.post(`${baseURL}/login`, {
            data: {
                email: "peter@klaven",
            }
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(400)

        // console.log(responseBody)
        expect(responseBody.error).toBe("Missing password")
    })

    test("PUT Request - UPD User", async ({ request }) => {
        const response = await request.put(`${baseURL}/users/2`, {
            data: {
                name: 'Nocolas KKK',
                job: 'Director Tesla Motors'
            }
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)

        // console.log(responseBody)
        expect(responseBody.name).toBe('Nocolas KKK')
        expect(responseBody.job).toBe('Director Tesla Motors')
    })
    test("DELETE Request - Delete user",async ({request}) => {
        const response = await request.delete(`${baseURL}/users/2`)
        expect(response.status()).toBe(204)
    })
})