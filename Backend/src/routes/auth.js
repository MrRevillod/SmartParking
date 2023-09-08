
import { Router } from "express"
import { avatarUpload } from "../config/multer.js"
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

router.post('/uploads', avatarUpload.single('avatar'), (req, res) => {

    try {

        if (!req.uploaded) throw { status: 400, message: "Bad request" }

        res.send("Imagen subida con exito")

    } catch (error) {
        res.status(error?.status || 500).json({ message: error?.message || MESSAGES.UNEXPECTED })
    }
})

export default router
