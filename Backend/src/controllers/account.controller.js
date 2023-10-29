
import { MESSAGES } from "../utils/http.utils.js"
import { saveError } from "../utils/error.utils.js"
import { userModel } from "../models/user.model.js"
import { createJwt } from "../utils/jwt.utils.js"
import { transporter } from "../utils/mailer.utils.js"
import { hashPassword } from "../utils/bcrypt.utils.js"
import { IP, PORT, PUBLIC_URL, JWT_SECRET, MAIL } from "../config/env.js"
import { changePasswordSubject, changePasswordTemplate } from "../utils/mail.template.js"

export const accountValidation = async (req, res) => {

    try {

        const { id } = req.params
        const validate = await userModel.findByIdAndUpdate(id,
            { $set: { validated: true } },
            { new: true }
        )

        if (!validate) throw { status: 500, message: MESSAGES.EMAIL_VERIFICATION_FAILED }

        res.render("account/validated", { baseUrl: PUBLIC_URL })

    } catch (error) {
        res.status(error?.status || 500).json({ message: error?.message || MESSAGES.UNEXPECTED })
        saveError(error)
    }
}

export const renderSendEmailPage = (req, res) => {
    res.render("account/send-reset-email", { baseUrl: PUBLIC_URL, adress: IP })
}

export const sendRecoveryEmail = async (req, res) => {

    try {

        const { email } = req.body

        const user = await userModel.findOne({ email })
        if (!user) throw { status: 404, message: MESSAGES.USER_NOT_FOUND }

        const secret = JWT_SECRET + user.password
        const payload = { uid: user.id }

        const token = createJwt(payload, secret)
        const url = `http://${IP}:${PORT}/api/auth/forgot-password/${user.id}/${token}`

        transporter.sendMail({
            from: `Smart Parking UCT ${MAIL}`,
            to: user.email,
            subject: changePasswordSubject,
            html: changePasswordTemplate(url)
        },
            (error, info) => {
                if (error) throw { status: 500, message: MESSAGES.PASSWORD_RESET_FAILED }
            })

        res.status(200).json({ message: MESSAGES.PASSWORD_RESET_SENT })

    } catch (error) {
        res.status(error?.status || 500).json({ message: error?.message || MESSAGES.UNEXPECTED })
        saveError(error)
    }
}

export const renderChangePasswordPage = (req, res) => {
    res.render("account/change-password", { baseUrl: PUBLIC_URL })
}

export const setNewPassword = async (req, res) => {

    try {

        const { id } = req.params
        const { password } = req.body

        const hash = await hashPassword(password)
        const updated = await userModel.findByIdAndUpdate(id, { $set: { password: hash } }, { new: true })

        if (!updated) throw { status: 500, message: MESSAGES.PASSWORD_RESET_FAILED }
        res.status(200).json({ message: MESSAGES.PASSWORD_CHANGED })

    } catch (error) {
        res.status(error?.status || 500).json({ message: error?.message || MESSAGES.UNEXPECTED })
        saveError(error)
    }
}
