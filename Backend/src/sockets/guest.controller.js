
import { userModel } from "../models/user.model.js"
import { parkingModel } from "../models/parking.model.js"

import { findParking } from "./parking.controller.js"
import { hashPassword } from "../utils/bcrypt.utils.js"

export const guestAccessController = async (socket, data) => {

    const { username, contact, patente } = data
    let user = await userModel.findOne({ $or: [{ username }, { contact }, { "vehicles.patente": patente }] })

    if (user) {
        socket.emit("guest-access-denied", {
            message: `El usuario ya existe en nuestro sistema o se encuentra 
            dentro del estacionamiento, usa la aplicaciÃ³n para ingresar`
        })

        return
    }

    const parking = await findParking()

    if (!parking) {

        socket.emit("guest-access-denied", {
            message: "No hay parkings disponibles"
        })

        return
    }

    const tempData = {
        username,
        email: `${username}-temp@mail.com`,
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
        ]
    }

    user = await userModel.create(tempData)
    await parkingModel.findOneAndUpdate({ name: parking.name }, { active: true, status: "ocupado" })

    socket.emit("guest-access-ok", {
        message: `Haz ingresado correctamente, que tengas una buena estadia
         en nuestro estacionamiento!`,
        place: user.parking
    })
}

export const guestExitController = async (socket, data) => {

    // ! TO DO 
    // * crear un sistema de codigo de salida unico para cada usuario
    // * temporal, esto para que no se marquen salidas falsas, etc

    const { patente } = data
    const user = await userModel.findOne({ "vehicles.patente": patente })

    if (!user) {
        socket.emit("guest-exit-denied", {
            message: "El usuario no existe en nuestro sistema"
        })

        return
    }

    const { id, parking } = user

    await userModel.findByIdAndDelete(id)
    await parkingModel.findOneAndUpdate({ name: parking }, { active: false, status: "libre" })

    socket.emit("guest-exit-ok", {
        message: `Hemos registrado tu salida del estacionamiento ${parking}`
    })
}