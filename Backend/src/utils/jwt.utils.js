
import jwt from "jsonwebtoken"
import { MESSAGES } from "./http.utils.js"

const { sign, verify } = jwt

export const createJwt = (payload, secret, expiresIn = 60 * 40) => {

    try {
        return sign(payload, secret, { expiresIn })

    } catch (error) {
        throw { status: 500, message: MESSAGES.UNEXPECTED }
    }
}

export const verifyJwt = (token, secret) => {

    try {
        const payload = verify(token, secret)
        return payload

    } catch (error) {

        if (error instanceof jwt.TokenExpiredError || error instanceof jwt.JsonWebTokenError) {
            throw { status: 401, message: MESSAGES.UNAUTHORIZED }
        }

        throw { status: 500, message: MESSAGES.UNEXPECTED }
    }
}
