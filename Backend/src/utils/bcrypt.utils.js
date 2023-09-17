
import bcrypt from "bcryptjs"

import { MESSAGES } from "./http.utils.js"

// Función para hashear contraseña recibida por params
// retorna una promesa<String>, 
// al resolverla se obtendrá el string encriptado

export const hashPassword = async (password) => {

    try {
        return await bcrypt.hash(password, 8)

    } catch (error) {
        throw { status: 500, message: MESSAGES.UNEXPECTED }
    }
}

// Función para comparar contraseña sin encriptar con una encriptada
// retorna una promesa <Boolean>, 
// al resolverla se obtendrá un boolean indicando si hay coincidencia

export const comparePassword = async (password, hash) => {

    try {
        return await bcrypt.compare(password, hash)

    } catch (error) {
        throw { status: 500, message: MESSAGES.UNEXPECTED }
    }
}
