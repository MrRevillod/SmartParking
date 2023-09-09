
import { Router } from "express"
import { validateRules } from "../middlewares/validator.mw.js"
import { loginRules, userRules } from "../rules/auth.rules.js"
import { accountValidation, loginController, registerController } from "../controllers/auth.controllers.js"
import { checkUserExist, checkValidateAccountToken } from "../middlewares/auth.mw.js"
import { uploadImage } from "../middlewares/upload.mw.js"

// Instancia base del router de express
// se utiliza para crear direcciones internas dentro de la aplicación
// ejemplo: localhost:3000/api/auth/login

const router = Router()

// Rutas base de autenticación:
// estructura base: router.HTTP_METHOD("/ruta", middlewares, controller)

router.post("/login", loginRules, validateRules, loginController)
router.post("/register", userRules, validateRules, registerController)
router.get("/validate-account/:id/:token", checkUserExist, checkValidateAccountToken, accountValidation)

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
