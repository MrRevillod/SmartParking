
import { MESSAGES } from "../utils/http.utils.js"
import { userModel } from "../models/user.model.js"
import { createJwt } from "../utils/jwt.utils.js"
import { transporter } from "../utils/mailer.utils.js"
import { JWT_SECRET, MAIL } from "../config/env.js"
import { hashPassword, comparePassword } from "../utils/bcrypt.utils.js"
import { changePasswordSubject, changePasswordTemplate, validationSubject, validationTemplate } from "../utils/mail.template.js"

export const loginController = async (req, res) => {

    try {

        const { email, password } = req.body

        const user = await userModel.findOne({ email })
        if (!user) throw { status: 401, message: MESSAGES.INVALID_CREDENTIALS }

        const hash = await comparePassword(password, user.password)
        if (!hash) throw { status: 401, message: MESSAGES.INVALID_CREDENTIALS }

        if (!user.validated) throw { status: 403, message: MESSAGES.EMAIL_NOT_VERIFIED }

        const payload = { uid: user.id }

        const token = createJwt(payload, JWT_SECRET)
        res.status(200).json({ message: MESSAGES.OK, token })

    } catch (error) {
        res.status(error?.status || 500).json({ message: error?.message || MESSAGES.UNEXPECTED })
    }
}

export const registerController = async (req, res) => {

    try {

        const { username, email, password, contact, vehicles } = req.body

        let user = await userModel.findOne({ $or: [{ username }, { email }] })
        if (user) throw { status: 409, message: MESSAGES.USER_EXIST }

        let contactExist = await userModel.findOne({ $or: [{ contact }] })
        if (contactExist) throw { status: 409, message: MESSAGES.CONTACT_EXIST }

        const hash = await hashPassword(password)
        user = await userModel.create({ username, email, password: hash, vehicles })

        const payload = { uid: user.id }
        const secret = JWT_SECRET + user.validated.toString()

        const token = createJwt(payload, secret)
        const url = `http://localhost:3000/api/auth/validate-account/${user.id}/${token}`

        // Enviar correo de verificación de cuenta
        // EN DESARROLLO utilizar console.log para ver la url

        // transporter.sendMail({
        //     from: `Smart Parking UCT ${MAIL}`,
        //     to: email,
        //     subject: validationSubject,
        //     html: validationTemplate(url)
        // },
        //     (error, info) => {
        //         if (error) throw { status: 500, message: MESSAGES.EMAIL_VERIFICATION_FAILED }
        //     })

        console.log(url)

        res.status(200).json({ message: MESSAGES.EMAIL_VERIFICATION_SENT })

    } catch (error) {
        res.status(error?.status || 500).json({ message: error?.message || MESSAGES.UNEXPECTED })
    }
}

export const accountValidation = async (req, res) => {

    try {

        const { id } = req.params
        const validate = await userModel.findByIdAndUpdate(id,
            { $set: { validated: true } },
            { new: true }
        )

        if (!validate) throw { status: 500, message: MESSAGES.EMAIL_VERIFICATION_FAILED }

        res.render("account/validated")

    } catch (error) {
        res.status(error?.status || 500).json({ message: error?.message || MESSAGES.UNEXPECTED })
    }
}

export const sendRecoveryEmail = async (req, res) => {

    try {

        const { email } = req.body

        const user = await userModel.findOne({ email })
        if (!user) throw { status: 404, message: MESSAGES.USER_NOT_FOUND }

        const secret = JWT_SECRET + user.password
        const payload = { uid: user.id }

        const token = createJwt(payload, secret)
        const url = `http://localhost:3000/api/auth/forgot-password/${user.id}/${token}`

        // Enviar correo de verificación de cuenta
        // EN DESARROLLO utilizar console.log para ver la url

        // transporter.sendMail({
        //     from: `Smart Parking UCT ${MAIL}`,
        //     to: user.email,
        //     subject: changePasswordSubject,
        //     html: changePasswordTemplate(url)
        // },
        //     (error, info) => {
        //         if (error) throw { status: 500, message: MESSAGES.PASSWORD_RESET_FAILED }
        //     })

        console.log(url)

        res.status(200).json({ message: MESSAGES.PASSWORD_RESET_SENT })

    } catch (error) {
        res.status(error?.status || 500).json({ message: error?.message || MESSAGES.UNEXPECTED })
    }
}

export const confirmSession = async (req, res) => {
    res.status(200).json({ message: MESSAGES.OK })
}

export const setNewPassword = async (req, res) => {

    try {

        const { id } = req.params
        const { password } = req.body

        const hash = await hashPassword(password)
        const updated = await userModel.findByIdAndUpdate(id, { $set: { password: hash } }, { new: true })

        if (!updated) throw { status: 500, message: MESSAGES.PASSWORD_RESET_FAILED }
        res.status(200).json({ message: MESSAGES.OK })

    } catch (error) {
        res.status(error?.status || 500).json({ message: error?.message || MESSAGES.UNEXPECTED })
    }
}

export const renderSendEmailPage = (req, res) => {
    res.render("account/send-reset-email")
}

export const renderChangePasswordPage = (req, res) => {
    res.render("account/change-password")
}