const crypto = require('crypto')

export async function getRandomNum() {
    return Math.floor(Math.random() * 10000 + 1)
}

export async function getRandomString() {
    return crypto.randomBytes(20).toString('hex')
}