
import { Router } from "express";
import { renderReservationClient, renderReservationPage, renderReservationRegister } from "../controllers/reservation.controller.js";
import { sessionValidation } from "../middlewares/session.mw.js";

const router = Router();

router.get("/", renderReservationClient);
router.get("/reservation", renderReservationPage);
router.get("/register", renderReservationRegister);

export default router;
