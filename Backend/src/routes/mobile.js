
import { Router } from "express"
import { renderMobileLogin, renderMobileRegister, renderMobileHome, renderMobileProfile } from "../controllers/mobile.controller.js"

const router = Router()

router.get("/", renderMobileLogin)
router.get("/register", renderMobileRegister)
router.get("/home", renderMobileHome)
router.get("/profile", renderMobileProfile)

export default router