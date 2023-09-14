
import { createTransport } from "nodemailer"
import { MAIL, MAIL_PASSWORD } from "../config/env.js"

export const transporter = createTransport({
    service: "gmail",
    auth: {
        user: MAIL,
        pass: MAIL_PASSWORD
    }
})