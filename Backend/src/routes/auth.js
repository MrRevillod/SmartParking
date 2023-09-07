
import { Router } from "express"
import { validateRules } from "../middlewares/validator.mw.js"
import { loginRules, userRules } from "../rules/auth.rules.js"
import { accountValidation, loginController, registerController } from "../controllers/auth.controller.js"
import { checkUserExist, checkValidateAccountToken } from "../middlewares/auth.mw.js"

// Instancia base del router de express
// se utiliza para crear direcciones internas dentro de la aplicación
// ejemplo: localhost:3000/api/auth/login

const router = Router()

// Rutas base de autenticación:
// estructura base: router.HTTP_METHOD("/ruta", middlewares, controller)

router.post("/login", loginRules, validateRules, loginController)
router.post("/register", userRules, validateRules, registerController)
router.get("/validate-account/:id/:token", checkUserExist, checkValidateAccountToken, accountValidation)

export default router
