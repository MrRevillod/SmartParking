
import jwt from "jsonwebtoken"
import { MESSAGES } from "./http.utils.js"

// Se importan las funciones sign y verify de jwt

const { sign, verify } = jwt

// ejemplo payload:
// payload = {uid: user.id}

// Función que recibe un payload con información de usuario y la clave de encriptación
// se asigna el tiempo de expiración del token (60s * 15)
// retorna un jwt firmado para el cliente

export const createJwt = (payload, secret) => {

    try {
        const expiresIn = 60 * 40
        return sign(payload, secret, { expiresIn })

    } catch (error) {
        throw { status: 500, message: MESSAGES.UNEXPECTED }
    }
}

// Función que recibe un token desde el cliente 
// y lo verifica usando una clave correspondiente
// si la verificación es exitosa retorna la información guardada en el payload

export const verifyJwt = (token, secret) => {

    try {
        return verify(token, secret)

    } catch (error) {
        throw { status: 500, message: MESSAGES.UNEXPECTED }
    }
}
