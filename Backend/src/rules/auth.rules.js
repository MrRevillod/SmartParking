
import { body } from "express-validator"

export const loginRules = [
    body("email").isEmail(),
    body("password").notEmpty()
]

// TO DO !
// Añadir validación de datos de vehiculo

// Las userRules tambien pueden utilizarse al registrarse

export const userRules = [
    body("username").notEmpty().isLength({ min: 5 }),
    body("email").isEmail(),
    body("password")
        .notEmpty()
        .isLength({ min: 8 })
        .matches(/\d/)
        .matches(/[a-z]/)
        .matches(/[!@#$%^&*]/)
]

export const passwordRules = [
    body("password")
        .notEmpty()
        .isLength({ min: 8 })
        .matches(/\d/)
        .matches(/[a-z]/)
        .matches(/[!@#$%^&*]/),
    body("confirmPassword")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Las contraseñas no coinciden')
            }
            return true
        })
]

export const vehicleRules = [
    body("patente")
    .notEmpty()
    .matches(/^[BCDFGHJKLPQRSTVWXYZ]{4}(1[0-9]|[2-9][0-9])$/),
    body("model")
    .notEmpty()
    .isLength({ max: 20})
    .matches(/^[a-zA-Z][0-9]{2}/),
    body("year")
    .notEmpty()
    .matches(/^(19[5-9][0-9]|20[0-1][0-9]|202[0-5])$/)
]