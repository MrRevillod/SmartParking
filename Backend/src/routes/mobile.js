
import { Router } from "express";
import { renderReservationClient, renderReservationPage } from "../controllers/reservation.controller.js";
import { sessionValidation } from "../middlewares/session.mw.js";

const router = Router();

router.get("/", renderReservationClient);
router.get("/reservation", renderReservationPage);

export default router;
