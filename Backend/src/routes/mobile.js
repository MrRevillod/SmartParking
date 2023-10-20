
import { Router } from "express"

import { renderReservationClient } from "../controllers/reservation.controller.js"

const router = Router()

router.get("/", renderReservationClient)

export default router