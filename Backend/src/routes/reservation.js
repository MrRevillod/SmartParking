
import { Router } from "express"

import { renderReservationClient } from "../controllers/reservation.controller.js"

const router = Router()

router.get("/client", renderReservationClient)

export default router