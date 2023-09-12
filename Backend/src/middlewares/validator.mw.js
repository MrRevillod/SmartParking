
import { validationResult } from "express-validator"

// MW tipo express-validator
// verifica los campos de la req y las rules por cada uno de ellos
// si alguno de ellos incumple estas rules retorna un 400 (Bad Request)
// de lo contrario pasa al controlador o mw siguiente por la función next()

export const validateRules = (req, res, next) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    next()
}
