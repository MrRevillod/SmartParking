
import { MESSAGES } from "../utils/http.utils.js"
import { MIME_TYPES } from "../rules/upload.rules.js"
import { PUBLIC_PATH, PUBLIC_URL } from "../config/env.js"

import path from "node:path"

export const uploadImage = async (req, res, next) => {

    try {

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({message: MESSAGES.UPLOAD_NOT_FOUND})
        }

        const { image } = req.files

        if (!MIME_TYPES.includes(image.mimetype)) {
            throw { status: 400, message: MESSAGES.MIME_TYPES }
        }

        const ext = path.extname(image.name)
        const filename = path.basename(image.name, ext)

        image.name = `${filename}-${Date.now()}${ext}`

        image.mv(`${PUBLIC_PATH}/images/${image.name}`, (err) => {
            if (err) throw { status: 500, message: MESSAGES.UNEXPECTED }
        })

        req.body.profilePicture = `${PUBLIC_URL}/images/${image.name}`
        next()

    } catch (error) {
        res.status(error?.status || 500).json({ message: error?.message || MESSAGES.UNEXPECTED })
    }
}

