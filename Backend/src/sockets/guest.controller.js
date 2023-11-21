
import { userModel } from "../models/user.model.js"
import { parkingModel } from "../models/parking.model.js"

import { MAIL, PUBLIC_URL } from "../config/env.js"

import { getParkings, findParking } from "./parking.controller.js"
import { getLogs, userAccessLogController, userExitLogController } from "./log.controller.js"

import { MESSAGES } from "../utils/http.utils.js"
import { transporter } from "../utils/mailer.utils.js"
import { hashPassword } from "../utils/bcrypt.utils.js"
import { stringToBinary, guestCode } from "../utils/guestcode.utils.js"
import { verificationCodeSubject, verificationCodeTemplate } from "../utils/mail.template.js"

export const guestAccessController = async (io, socket, data) => {

    const { username, contact, email, patente } = data
    let user = await userModel.findOne({ $or: [{ username }, { contact }, { email }, { "vehicles.patente": patente }] })

    if (user) {
        socket.emit("guest-access-denied", {
            message: `El usuario ya se encuentra en nuestro sistema 
            intenta usar la aplicación para ingresar`
        })

        return
    }

    const toBinUsername = stringToBinary(username)
    const toBinContact = stringToBinary(contact)
    const toBinPatente = stringToBinary(patente)

    const verCode = guestCode(toBinUsername, toBinContact, toBinPatente)
    const parking = await findParking()

    if (!parking) {
        socket.emit("guest-access-denied", {
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
                patente,
                model: "temp",
                year: "temp"
            }
        ],
        verificationCode: verCode
    }

    user = await userModel.create(tempData)
    await parkingModel.findOneAndUpdate({ name: parking.name }, { active: true, status: "ocupado", userId: user.id })

    socket.emit("guest-access-ok", {
        message: `Haz ingresado correctamente. Te hemos enviado un código de verificación 
        a tu correo electrónico para que puedas registrar tu salida`,
        place: user.parking,
        verify: user.verificationCode
    })

    const url = `${PUBLIC_URL}}/api/parking/guest-exit?patente=${patente}&verificationCode=${verCode}`

    transporter.sendMail({
        from: `Smart Parking UCT ${MAIL}`,
        to: user.email,
        subject: verificationCodeSubject,
        html: verificationCodeTemplate(user.username, verCode, url)
    },
        (error, info) => {

            if (error) {
                socket.emit("guest-access-denied", {
                    message: MESSAGES.EMAIL_UNEXPECTED_ERROR
                })

                return
            }
        }
    )

    await userAccessLogController(socket, username, parking.name, patente)

    io.to("administradores").emit("all-logs", {
        logs: await getLogs()
    })

    io.to("administradores").emit("all-parkings", {
        parkings: await getParkings(),
    })
}

export const guestExitController = async (io, socket, data) => {

    const { patente, verificationCode } = data
    const user = await userModel.findOne({ "role": "TEMP_ROLE", "vehicles.patente": patente, "verificationCode": verificationCode })

    if (!user) {
        socket.emit("guest-exit-denied", {
            message: "El usuario no existe en nuestro sistema o algún dato ingresado es inválido"
        })

        return
    }

    const { id, parking } = user

    await userModel.findByIdAndDelete(id)
    await parkingModel.findOneAndUpdate({ name: parking }, { active: false, status: "disponible", userId: "" })

    socket.emit("guest-exit-ok", {
        message: `Hemos registrado tu salida del estacionamiento ${parking}`
    })

    await userExitLogController(socket, user.username, parking)

    io.to("administradores").emit("all-logs", {
        logs: await getLogs()
    })

    io.to("administradores").emit("all-parkings", {
        parkings: await getParkings(),
    })
}