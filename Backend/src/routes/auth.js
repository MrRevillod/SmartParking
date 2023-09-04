
import { Router } from "express"
import { validateRules } from "../middlewares/validator.mw.js"
import { loginRules, userRules } from "../rules/auth.rules.js"
import { accountValidation, loginController, registerController } from "../controllers/auth.controller.js"
import { checkUserExist, checkValidateAccountToken } from "../middlewares/auth.mw.js"

const router = Router()

router.post("/login", loginRules, validateRules, loginController)
router.post("/register", userRules, validateRules, registerController)
router.get("/validate-account/:id/:token", checkUserExist, checkValidateAccountToken, accountValidation)

export default router
