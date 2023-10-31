
import { PUBLIC_URL } from "../config/env.js"

export const renderGuestAccess = (req, res) => {
    res.render("guest/access", { baseUrl: PUBLIC_URL })
}

export const renderGuestExit = (req, res) => {
    res.render("guest/exit", { baseUrl: PUBLIC_URL })
}