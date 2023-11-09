
import { Types } from "mongoose"
import { MESSAGES } from "../utils/http.utils.js"
import { saveError } from "../utils/error.utils.js"
import { validationResult } from "express-validator"

export const validateRules = (req, res, next) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    next()
}

export const validateMongoUid = (req, res, next) => {

    try {

        const { id } = req.params

        if (!Types.ObjectId.isValid(id)) throw { status: 400, message: MESSAGES.USER_NOT_FOUND }
        next()

    } catch (error) {
        saveError(error)
        res.status(error?.status || 500).json({ message: error?.message || MESSAGES.UNEXPECTED })
    }
}