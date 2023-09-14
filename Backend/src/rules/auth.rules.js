
import { body } from "express-validator"

export const loginRules = [
    body("email").isEmail().withMessage("El campo 'email' debe ser una dirección de correo electrónico válida"),
    body("password").notEmpty().withMessage("El campo 'password' no puede estar vacío"),
]

export const userRules = [
    body("username")
        .notEmpty()
        .isLength({ min: 5 })
        .withMessage("El campo 'username' debe tener al menos 5 caracteres"),
    body("email").isEmail().withMessage("El campo 'email' debe ser una dirección de correo electrónico válida"),
    body("password")
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage("El campo 'password' debe tener al menos 8 caracteres")
        .matches(/\d/)
        .withMessage("El campo 'password' debe contener al menos un número")
        .matches(/[a-z]/)
        .withMessage("El campo 'password' debe contener al menos una letra minúscula")
        .matches(/[!@#$%^&*]/)
        .withMessage("El campo 'password' debe contener al menos un carácter especial: !@#$%^&*"),
]

export const passwordRules = [
    body("password")
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage("El campo 'password' debe tener al menos 8 caracteres")
        .matches(/\d/)
        .withMessage("El campo 'password' debe contener al menos un número")
        .matches(/[a-z]/)
        .withMessage("El campo 'password' debe contener al menos una letra minúscula")
        .matches(/[!@#$%^&*]/)
        .withMessage("El campo 'password' debe contener al menos un carácter especial: !@#$%^&*"),
    body("confirmPassword")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Las contraseñas no coinciden');
            }
            return true;
        })
        .withMessage("Las contraseñas no coinciden"),
]

export const vehicleRules = [
    body('vehicles.*.patente')
        .notEmpty()
        .matches(/^[BCDFGHJKLPQRSTVWXYZ]{4}(1[0-9]|[2-9][0-9])$/)
        .withMessage('La patente debe tener el formato correcto'),

    body('vehicles.*.model')
        .notEmpty()
        .isLength({ max: 20 })
        .withMessage('El modelo debe tener un máximo de 20 caracteres'),

    body('vehicles.*.year')
        .notEmpty()
        .matches(/^(19[5-9][0-9]|20[0-1][0-9]|202[0-5])$/)
        .withMessage('El año debe estar en el rango de 1950 a 2025'),
]
