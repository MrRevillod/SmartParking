
import Router from "express"

import { roleValidation } from "../middlewares/roles.mw.js"
import { getActiveParking } from "../controllers/parking.controllers.js"
import { sessionValidation } from "../middlewares/session.mw.js"

const router = Router()

router.get("/active", sessionValidation, roleValidation(["ADMIN_ROLE"]), getActiveParking)

export default router