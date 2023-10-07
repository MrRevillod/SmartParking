
import { MAIL, JWT_SECRET } from "../config/env.js"
import { userModel } from "../models/user.model.js"
import { hashPassword } from "../utils/bcrypt.utils.js"
import { createJwt, verifyJwt } from "../utils/jwt.utils.js"
import { simulateParking } from "../utils/parking.utils.js"
import { exitSubject, exitTemplate } from "../utils/mail.template.js"
import { transporter } from "../utils/mailer.utils.js"

// TO DO! hacer un controller de parking que 
// permita encontrar el primer parking disponible (active: false)
// y luego actualizarlo a active: true
// obtener el name de ese parking y guardarlo en la constante place
// si no hay parkings disponibles, retornar un mensaje de error con socket.emit

export const saveTempUser = async (socket, data) => {

    const { username, contact, email } = data
    const parking = await simulateParking()

    if (!parking) {

        socket.emit("access-denied", {
            message: "No hay parkings disponibles"
        })

        return
    }

    const tempData = {
        username,
        email,
        password: await hashPassword("temp"),
        role: "TEMP_ROLE",
        contact,
        active: true,
        parking: parking.name,
        vehicles: [
            {
                patente: "temp",
                model: "temp",
                year: "temp"
            }
        ]
    }

    const user = await userModel.create(tempData)
    const payload = { uid: user.id }

    const secret = JWT_SECRET + user.active.toString()
    const token = createJwt(payload, secret)

    const url = `http://localhost:3000/api/parking/exit/${user.id}/${token}`

    // Enviar correo de verificación de cuenta
    // EN DESARROLLO utilizar console.log para ver la url

    //transporter.sendMail({
    //    from: `Smart Parking UCT ${MAIL}`,
    //    to: email,
    //    subject: exitSubject,
    //    html: exitTemplate(url)
    //},
    //    (error, info) => {
    //        if (error) {
    //            socket.emit("access-denied", {
    //                message: `Ha ocurrido un error al confirmar/enviar la validación a tu email. 
    //                Verifica tus datos o vuelve a intentarlo.`
    //            })
    //
    //            console.log(error)
    //        }
    //    })
    //

    console.log(url)

    socket.emit("access-ok", {
        message: `Hemos dejado una url en tu correo, 
        debes ingresar a ella cuando abandones nuestro estacionamiento!`,
        place: user.parking
    })
}

export const tempCheckOut = async (req, res) => {

    try {

        const { id, token } = req.params

        let user = await userModel.findById(id)

        if (!user) {
            res.render("invalid-url")
            return
        }

        const secret = JWT_SECRET + user.active.toString()
        verifyJwt(token, secret)

        user = await userModel.findByIdAndDelete(user.id)
        res.render("guest/exit.ejs")

    } catch (error) {
        res.render("invalid-url")
    }
}