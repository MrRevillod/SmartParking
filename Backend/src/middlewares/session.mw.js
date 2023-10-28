
import { JWT_SECRET } from "../config/env.js"
import { MESSAGES } from "../utils/http.utils.js"
import { verifyJwt } from "../utils/jwt.utils.js"
import { saveError } from "../utils/error.txt.js"
import { expiredTokens } from "../utils/etoken.utils.js"

export const sessionValidation = async (req, res, next) => {

    try {

        const token = req.headers.authorization?.split(' ').pop() || ''

        if ( expiredTokens.includes(token)) throw { status: 401, message: MESSAGES.UNAUTHORIZED }
        
        const payload = verifyJwt(token, JWT_SECRET)

        req.user = payload
        next()

    } catch (error) {
        return res.status(401).json({ message: MESSAGES.UNAUTHORIZED })
        saveError(error)
    }
}