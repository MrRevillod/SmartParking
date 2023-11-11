
import { MESSAGES } from "../utils/http.utils.js"
import { verifyJwt } from "../utils/jwt.utils.js"
import { saveError } from "../utils/error.utils.js"

import { userModel } from "../models/user.model.js"
import { JWT_SECRET, PUBLIC_URL } from "../config/env.js"

// Mw para verificar si el usuario solicitado (id) existe
export const checkUserExist = async (req, res, next) => {

    try {

        const { id } = req.params
        const user = await userModel.findById(id)

        if (!user) throw { status: 404, message: MESSAGES.USER_NOT_FOUND }

        req.foundUser = user
        next()

    } catch (error) {
        saveError(error)
        res.render("invalid-url", { baseUrl: PUBLIC_URL })
    }
}

// Mw para validar si el token de confirmación de cuenta es valido
export const checkValidateAccountToken = async (req, res, next) => {

    try {

        const { token } = req.params
        const user = req.foundUser

        const secret = JWT_SECRET + user.validated.toString()
        verifyJwt(token, secret)

        next()

    } catch (error) {
        saveError(error)
        res.render("invalid-url", { baseUrl: PUBLIC_URL })
    }
}

// Mw para validar si el token de cambio de contraseña es valido
export const checkChangePasswordToken = async (req, res, next) => {

    try {

        const { token } = req.params
        const user = req.foundUser

        const secret = JWT_SECRET + user.password
        verifyJwt(token, secret)

        next()

    } catch (error) {
        saveError(error)
        res.render("invalid-url", { baseUrl: PUBLIC_URL })
    }
}
