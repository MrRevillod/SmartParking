
import { Router } from "express"

import { roleValidation } from "../middlewares/roles.mw.js"
import { getActiveParking } from "../controllers/parking.controllers.js"
import { sessionValidation } from "../middlewares/session.mw.js"
import { renderGuestAccess, renderGuestExit } from "../controllers/guest.controllers.js"

const router = Router()

router.get("/active", sessionValidation, roleValidation(["ADMIN_ROLE"]), getActiveParking)
router.get("/guest-access", renderGuestAccess)
router.get("/guest-exit", renderGuestExit)

export default router