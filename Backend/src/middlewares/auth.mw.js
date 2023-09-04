
import { MESSAGES } from "../utils/http.utils.js"
import { verifyJwt } from "../utils/jwt.utils.js"
import { userModel } from "../models/user.model.js"
import { JWT_SECRET } from "../config/env.js"

// Mw para verificar si el usuario solicitado (id) existe

export const checkUserExist = async (req, res, next) => {

    try {

        const { id } = req.params
        const user = await userModel.findById(id)

        if (!user) throw { status: 404, message: MESSAGES.USER_NOT_FOUND }

        req.foundUser = user
        next()

    } catch (error) {

        // TO DO !
        // Crear página que muestre algo como "URL invalida"
        // esto por que  se esta tratando de acceder/validar 
        // un usuario que no existe

        // res.render("")

        console.log(error)
    }
}

// Mw para validar si el token de confirmación de cuenta es valido

export const checkValidateAccountToken = async (req, res, next) => {

    try {

        const { token } = req.params
        const user = req.foundUser

        console.log(user)

        const secret = JWT_SECRET + user.validated.toString()
        console.log(secret)
        verifyJwt(token, secret)

        next()

    } catch (error) {

        // TO DO !
        // Crear página que muestre algo como "URL invalida"
        // esto por que  se esta tratando de acceder/validar 
        // un usuario que no existe

        console.log(error)

        // res.render("")
    }

}

// Mw para validar si el token de cambio de contraseña es valido

export const checkChangePasswordToken = async (req, res, next) => { }
