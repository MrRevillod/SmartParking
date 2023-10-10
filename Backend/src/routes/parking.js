
import { Router } from "express"

import { ownerValidation, roleValidation } from "../middlewares/roles.mw.js"
import { getActiveParking, getParking, getParkings } from "../controllers/parking.controllers.js"
import { sessionValidation } from "../middlewares/session.mw.js"
import { renderGuestAccess, renderGuestExit } from "../controllers/guest.controllers.js"
import { findParking } from "../utils/parking.utils.js"

const router = Router()

router.get("/active", sessionValidation, roleValidation(["ADMIN_ROLE"]), getActiveParking)
router.get("/guest-access", renderGuestAccess)
router.get("/guest-exit", renderGuestExit)
router.get("/find-parking", findParking)
router.get("/", sessionValidation, roleValidation(["ADMIN_ROLE"]), getParkings)
router.get("/:id", sessionValidation, ownerValidation, getParking)

export default router