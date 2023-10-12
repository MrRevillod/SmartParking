
import { MESSAGES } from "../utils/http.utils.js"
import { userModel } from "../models/user.model.js"

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

export const renderSendEmailPage = (req, res) => {
    res.render("account/send-reset-email")
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

        //transporter.sendMail({
        //    from: `Smart Parking UCT ${MAIL}`,
        //    to: user.email,
        //    subject: changePasswordSubject,
        //    html: changePasswordTemplate(url)
        //},
        //    (error, info) => {
        //        if (error) throw { status: 500, message: MESSAGES.PASSWORD_RESET_FAILED }
        //    })

        console.log(url)

        res.status(200).json({ message: MESSAGES.PASSWORD_RESET_SENT })

    } catch (error) {
        res.status(error?.status || 500).json({ message: error?.message || MESSAGES.UNEXPECTED })
    }
}

export const renderChangePasswordPage = (req, res) => {
    res.render("account/change-password")
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
