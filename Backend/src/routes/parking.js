
import { Router } from "express"

import { sessionValidation } from "../middlewares/session.mw.js"
import { roleValidation, ownerValidation } from "../middlewares/roles.mw.js"

import { getParkings, getParking } from "../controllers/parking.controller.js"
import { renderGuestAccess, renderGuestExit } from "../controllers/guest.controller.js"

const router = Router()


router.get("/guest-access", renderGuestAccess)
router.get("/guest-exit", renderGuestExit)

router.get("/:id", sessionValidation, ownerValidation, getParking)
router.get("/", sessionValidation, roleValidation(["ADMIN_ROLE"]), getParkings)

export default router