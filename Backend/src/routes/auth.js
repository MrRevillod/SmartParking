
import { Router } from "express"

import { validateRules } from "../middlewares/validator.mw.js"
import { sessionValidation } from "../middlewares/session.mw.js"
import { checkChangePasswordToken, checkUserExist, checkValidateAccountToken } from "../middlewares/auth.mw.js"

import { loginRules, passwordRules, userRules, vehicleRules } from "../rules/auth.rules.js"

import { adminLoginController, loginController, registerController, confirmSession, logoutController } from "../controllers/auth.controller.js"
import { accountValidation, renderSendEmailPage, renderChangePasswordPage, sendRecoveryEmail, setNewPassword } from "../controllers/account.controller.js"

const router = Router()

// route basic struct: router.HTTP_METHOD("/ruta", middlewares, controller)

// Auth routes

router.post("/login", loginRules, validateRules, loginController)
router.post("/admin-login", loginRules, validateRules, adminLoginController)
router.post("/logout", sessionValidation, logoutController)
router.post("/register", userRules, vehicleRules, validateRules, registerController)

router.post("/confirm-session", sessionValidation, confirmSession)
router.get("/validate-account/:id/:token", checkUserExist, checkValidateAccountToken, accountValidation)

// Change password routes

router.get("/forgot-password", renderSendEmailPage)
router.post("/forgot-password", sendRecoveryEmail)

router.get("/forgot-password/:id/:token", checkUserExist, checkChangePasswordToken, renderChangePasswordPage)
router.put("/forgot-password/:id/:token", checkUserExist, checkChangePasswordToken, passwordRules, validateRules, setNewPassword)

export default router
