
import { JWT_SECRET } from "../config/env.js"
import { verifyToken } from "../utils/jwt.utils.js"
import { MESSAGES } from "../utils/http.utils.js"

export const sessionValidation = async (req, res, next) => {

    try {

        const token = req.headers.authorization?.split(' ').pop() || ''
        const payload = verifyToken(token, JWT_SECRET)

        req.user = payload
        next()

    } catch (error) {
        return res.status(401).json({ message: MESSAGES.UNAUTHORIZED })
    }
}