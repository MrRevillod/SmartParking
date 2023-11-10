
import { Router } from "express"
import { PUBLIC_URL } from "../config/env.js"

const router = Router()

router.get("/", (req, res) => {
    res.render("docs/", { baseUrl: PUBLIC_URL })
})

router.get("/regex", (req, res) => {
    res.render("docs/regex", { baseUrl: PUBLIC_URL })
})

export default router