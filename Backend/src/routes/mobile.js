
import { Router } from "express"
import { renderMobileLogin, renderMobileRegister, renderMobileHome } from "../controllers/mobile.controller.js"

const router = Router()

router.get("/", renderMobileLogin)
router.get("/register", renderMobileRegister)
router.get("/home", renderMobileHome)

export default router