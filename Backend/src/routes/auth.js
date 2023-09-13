
import { Router } from "express"
import { uploadImage } from "../middlewares/upload.mw.js"
import { validateRules } from "../middlewares/validator.mw.js"
import { loginRules, passwordRules, userRules } from "../rules/auth.rules.js"
import { checkChangePasswordToken, checkUserExist, checkValidateAccountToken } from "../middlewares/auth.mw.js"
import { accountValidation, loginController, registerController, sendRecoveryEmail, setNewPassword, renderChangePasswordPage, renderSendEmailPage } from "../controllers/auth.controllers.js"

const router = Router()

// route basic struct: router.HTTP_METHOD("/ruta", middlewares, controller)

// Auth routes
router.post("/login", loginRules, validateRules, loginController)
router.post("/register", userRules, validateRules, registerController)
router.get("/validate-account/:id/:token", checkUserExist, checkValidateAccountToken, accountValidation)

// Change password routes
router.get("/forgot-password", renderSendEmailPage)
router.post("/forgot-password", sendRecoveryEmail)

router.get("/forgot-password/:id/:token", checkUserExist, checkChangePasswordToken, renderChangePasswordPage)
router.put("/forgot-password/:id/:token", checkUserExist, checkChangePasswordToken, passwordRules, validateRules, setNewPassword)

// ruta base para subir imagenes

// TO DO !
// uploadImage es un middleware que se encarga de subir la imagen al servidor
// y guardar la ruta en req.body.image

// La idea es que el usuario pueda subir una imagen de perfil, entonces esta ruta
// sería parte del manejo de usuarios. Por lo tanto, debería estar en el archivo ./users.js

// Además antes de subir la imagen, se debería verificar que el usuario esté autenticado
// esto con un jwt verify, luego de verificar el token, se puede acceder al id del usuario
// y con ese id se puede buscar el usuario en la base de datos y actualizar la url de su 
// imagen de perfil

router.post("/upload/profile-picture", uploadImage, (req, res) => {

    // req.body.image contiene la ruta de la imagen subida

    const { imageURL } = req.body
    res.status(200).json({ message: `Imagen subida en ${imageURL}` })
})

export default router
