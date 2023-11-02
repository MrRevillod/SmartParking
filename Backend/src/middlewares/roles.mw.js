
import { MESSAGES } from "../utils/http.utils.js"
import { saveError } from "../utils/error.utils.js"
import { userModel } from "../models/user.model.js"

export const roleValidation = (roles) => async (req, res, next) => {

    try {

        const uid = req.user.uid
        const user = await userModel.findById(uid)

        if (!user || !roles.includes(user.role)) {
            throw { status: 401, message: MESSAGES.UNAUTHORIZED }
        }

        next()

    } catch (error) {
        res.status(error?.status || 500).json({ message: error?.message || MESSAGES.UNEXPECTED })
        saveError(error)
    }
}

export const ownerValidation = async (req, res, next) => {

    try {

        const reqId = req.user.uid
        const userId = req.params.id

        const user = await userModel.findById(reqId)

        if (!user || (user.role !== 'ADMIN_ROLE' && reqId !== userId)) {
            throw { status: 401, message: MESSAGES.UNAUTHORIZED }
        }

        req.user = user

        next()

    } catch (error) {
        saveError(error)
        res.status(error?.status || 500).json({ message: error?.message || MESSAGES.UNEXPECTED })
    }
}
