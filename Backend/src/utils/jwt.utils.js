
import jwt from "jsonwebtoken"
import { MESSAGES } from "./http.utils.js"

const { sign, verify } = jwt

export const createJwt = (payload, secret) => {

    try {
        const expiresIn = 60 * 15
        return sign(payload, secret, { expiresIn })

    } catch (error) {
        throw { status: 500, message: MESSAGES.UNEXPECTED }
    }
}

export const verifyJwt = (token, secret) => {

    try {
        return verify(token, secret)

    } catch (error) {
        console.log(error)
        throw { status: 500, message: MESSAGES.UNEXPECTED }
    }
}
