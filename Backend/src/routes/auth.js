
import { Router } from "express"
import { validateRules } from "../middlewares/validator.mw.js"
import { confirmSession, logoutController } from "../controllers/auth.controllers.js"
import { sessionValidation } from "../middlewares/session.mw.js"
import { loginRules, passwordRules, userRules, vehicleRules } from "../rules/auth.rules.js"
import { checkChangePasswordToken, checkUserExist, checkValidateAccountToken } from "../middlewares/auth.mw.js"
import { accountValidation, loginController, registerController, sendRecoveryEmail, setNewPassword, renderChangePasswordPage, renderSendEmailPage } from "../controllers/auth.controllers.js"

const router = Router()

// route basic struct: router.HTTP_METHOD("/ruta", middlewares, controller)

// Auth routes
router.post("/login", loginRules, validateRules, loginController)
router.post("/register", userRules, vehicleRules, validateRules, registerController)
router.get("/validate-account/:id/:token", checkUserExist, checkValidateAccountToken, accountValidation)
router.post("/confirm-session", sessionValidation, confirmSession)
router.post("/logout", sessionValidation, logoutController)

// Change password routes
router.get("/forgot-password", renderSendEmailPage)
router.post("/forgot-password", sendRecoveryEmail)

router.get("/forgot-password/:id/:token", checkUserExist, checkChangePasswordToken, renderChangePasswordPage)
router.put("/forgot-password/:id/:token", checkUserExist, checkChangePasswordToken, passwordRules, validateRules, setNewPassword)

export default router
