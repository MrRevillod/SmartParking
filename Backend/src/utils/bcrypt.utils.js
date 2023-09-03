
import bcrypt from "bcryptjs"

import { MESSAGES } from "./http.utils.js"

export const hashPassword = async (password) => {

    try {
        return await bcrypt.hash(password, 8)

    } catch (error) {
        console.log(error)
        throw { status: 500, message: MESSAGES.UNEXPECTED }
    }
}

export const comparePassword = async (password, hash) => {

    try {
        return await bcrypt.compare(password, hash)

    } catch (error) {
        console.log(error)
        throw { status: 500, message: MESSAGES.UNEXPECTED }
    }
}
