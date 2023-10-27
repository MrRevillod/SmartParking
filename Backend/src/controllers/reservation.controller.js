
import { PUBLIC_URL } from "../config/env.js"

export const renderReservationClient = (req, res) => {
    res.render("mobile/", { baseUrl: PUBLIC_URL })
}