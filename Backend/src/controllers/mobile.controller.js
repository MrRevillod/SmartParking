
import { PUBLIC_URL } from "../config/env.js"

export const renderMobileLogin = (req, res) => {
    res.render("mobile/", { baseUrl: PUBLIC_URL })
}

export const renderMobileRegister = (req, res) => {
    res.render("mobile/register", { baseUrl: PUBLIC_URL })
}

export const renderMobileHome = (req, res) => {
    res.render("mobile/home", { baseUrl: PUBLIC_URL })
}

export const renderMobileProfile = (req, res) => {
    res.render("mobile/profile", { baseUrl: PUBLIC_URL })
}