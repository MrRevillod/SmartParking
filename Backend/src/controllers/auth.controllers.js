
import { MESSAGES } from "../utils/http.utils.js"
import { userModel } from "../models/user.model.js"
import { JWT_SECRET } from "../config/env.js"
import { createJwt } from "../utils/jwt.utils.js"
import { hashPassword, comparePassword } from "../utils/bcrypt.utils.js"

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

        const { username, email, password, vehicles } = req.body

        console.log(req.body)

        let user = await userModel.findOne({ $or: [{ username }, { email }] })
        if (user) throw { status: 409, message: MESSAGES.USER_EXIST }

        const hash = await hashPassword(password)
        user = await userModel.create({ username, email, password: hash, vehicles })

        const payload = { uid: user.id }
        const secret = JWT_SECRET + user.validated.toString()

        const token = createJwt(payload, secret)
        const url = `http://localhost:3000/api/auth/validate-account/${user.id}/${token}`

        console.log(url)

        // TO DO !
        // RESEND: send validation email params: email, url
        // Crear util "resend.utils.js" para enviar correos genericos

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

        // TO DO !
        // EJS: Templates HTML para render "accountValidation/Succesfull"
        // res.status(200).render("")

        res.status(200).send("Cuenta validada")

    } catch (error) {
        res.status(error?.status || 500).json({ message: error?.message || MESSAGES.UNEXPECTED })
    }
}
