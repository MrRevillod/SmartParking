
import { userModel } from "../models/user.model.js"
import { JWT_SECRET, MAIL, PUBLIC_URL } from "../config/env.js"

import { MESSAGES } from "../utils/http.utils.js"
import { saveError } from "../utils/error.utils.js"
import { transporter } from "../utils/mailer.utils.js"
import { createJwt, verifyJwt } from "../utils/jwt.utils.js"
import { hashPassword, comparePassword } from "../utils/bcrypt.utils.js"
import { validationSubject, validationTemplate } from "../utils/mail.template.js"

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
        saveError(error)
        res.status(error?.status || 500).json({ message: error?.message || MESSAGES.UNEXPECTED })
    }
}

export const adminLoginController = async (req, res) => {

    try {

        const { email, password } = req.body

        const user = await userModel.findOne({ email })
        if (!user) throw { status: 401, message: MESSAGES.INVALID_CREDENTIALS }

        const hash = await comparePassword(password, user.password)
        if (!hash) throw { status: 401, message: MESSAGES.INVALID_CREDENTIALS }

        if (!user.validated) throw { status: 403, message: MESSAGES.EMAIL_NOT_VERIFIED }
        if (user.role !== "ADMIN_ROLE") throw { status: 403, message: MESSAGES.UNAUTHORIZED }

        const payload = { uid: user.id }

        const token = createJwt(payload, JWT_SECRET)
        res.status(200).json({ message: MESSAGES.OK, token })

    } catch (error) {
        saveError(error)
        res.status(error?.status || 500).json({ message: error?.message || MESSAGES.UNEXPECTED })
    }
}

export const registerController = async (req, res) => {

    try {

        const { username, email, password, contact, vehicles } = req.body

        const usernameExist = await userModel.findOne({ username })
        if (usernameExist) throw { status: 409, message: MESSAGES.USERNAME_EXIST }

        const emailExist = await userModel.findOne({ email })
        if (emailExist) throw { status: 409, message: MESSAGES.EMAIL_EXIST }

        let contactExist = await userModel.findOne({ contact })
        if (contactExist) throw { status: 409, message: MESSAGES.CONTACT_EXIST }

        const hash = await hashPassword(password)
        const user = await userModel.create({ username, email, password: hash, contact, vehicles })

        const payload = { uid: user.id }
        const secret = JWT_SECRET + user.validated.toString()

        const token = createJwt(payload, secret)
        const url = `${PUBLIC_URL}/api/auth/validate-account/${user.id}/${token}`

        transporter.sendMail({
            from: `Smart Parking UCT ${MAIL}`,
            to: email,
            subject: validationSubject,
            html: validationTemplate(url)
        },
            (error, info) => {
                if (error) throw { status: 500, message: MESSAGES.EMAIL_VERIFICATION_FAILED }
            })

        res.status(200).json({ message: MESSAGES.EMAIL_VERIFICATION_SENT })

    } catch (error) {
        saveError(error)
        res.status(error?.status || 500).json({ message: error?.message || MESSAGES.UNEXPECTED })
    }
}

export const confirmSession = async (req, res) => {
    res.status(200).json({ message: MESSAGES.OK })
}

export const logoutController = async (req, res) => {

    try {

        const token = req.headers.authorization?.split(' ').pop() || ''
        const payload = verifyJwt(token, JWT_SECRET)
        const uid = payload.uid

        const user = await userModel.findById(uid)
        if (!user) throw { status: 401, message: MESSAGES.USER_NOT_FOUND }

        const expired = user.expiredTokens.push(token)
        if (!expired) throw { status: 500, message: MESSAGES.INVALID_TOKEN }

        await user.save()
        res.status(200).json({ message: MESSAGES.OK })

    } catch (error) {
        saveError(error)
        res.status(error?.status || 500).json({ message: error?.message || MESSAGES.UNEXPECTED })
    }
}
