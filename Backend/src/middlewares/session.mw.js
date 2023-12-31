
import { MESSAGES } from "../utils/http.utils.js"
import { verifyJwt } from "../utils/jwt.utils.js"
import { saveError } from "../utils/error.utils.js"

import { userModel } from "../models/user.model.js"
import { JWT_SECRET } from "../config/env.js"

export const sessionValidation = async (req, res, next) => {

    try {

        const token = req.headers.authorization?.split(' ').pop() || ''
        const payload = verifyJwt(token, JWT_SECRET)

        req.user = payload

        const user = await userModel.findById(req.user.uid)
        if (!user) throw { status: 401, message: MESSAGES.USER_NOT_FOUND }

        if (user.expiredTokens.includes(token)) throw { status: 401, message: MESSAGES.UNAUTHORIZED }

        next()

    } catch (error) {
        saveError(error)
        res.status(error?.status || 500).json({ message: error?.message || MESSAGES.UNEXPECTED })
    }
}