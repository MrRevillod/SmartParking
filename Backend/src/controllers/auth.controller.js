
import { MESSAGES } from "../utils/http.utils.js"
import { saveError } from "../utils/error.utils.js"
import { userModel } from "../models/user.model.js"
import { transporter } from "../utils/mailer.utils.js"
import { createJwt, verifyJwt } from "../utils/jwt.utils.js"
import { JWT_SECRET, MAIL, PUBLIC_URL } from "../config/env.js"
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
        res.status(error?.status || 500).json({ message: error?.message || MESSAGES.UNEXPECTED })
        saveError(error)
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
        res.status(error?.status || 500).json({ message: error?.message || MESSAGES.UNEXPECTED })
        saveError(error)
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
        user = await userModel.create({ username, email, password: hash, contact, vehicles })

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
                console.log(error ? error : info)
                if (error) throw { status: 500, message: MESSAGES.EMAIL_VERIFICATION_FAILED }
            })

        res.status(200).json({ message: MESSAGES.EMAIL_VERIFICATION_SENT })

    } catch (error) {
        res.status(error?.status || 500).json({ message: error?.message || MESSAGES.UNEXPECTED })
        saveError(error)
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
        res.status(error?.status || 500).json({ message: error?.message || MESSAGES.UNEXPECTED })
        saveError(error)
    }
}
