
import { userModel } from "../models/user.model.js"
import { hashPassword } from "../utils/bcrypt.utils.js"
import { parkingModel } from "../models/parking.model.js"
import { simulateParking } from "../utils/parking.utils.js"

// TO DO! 
// hacer una función que encuentre y retorne el primer parking 
// disponible (active: false) || (status: "libre") 
// y luego actualizarlo a active: true, status: "ocupado"

export const guestAccessController = async (socket, data) => {

    const { username, contact, patente } = data
    const user = await userModel.findOne({ $or: [{ username }, { contact }, { "vehicles.patente": patente }] })

    if (user) {
        socket.emit("guest-access-denied", {
            message: `El usuario ya existe en nuestro sistema o se encuentra 
            dentro del estacionamiento, usa la aplicación para ingresar`
        })

        return
    }

    const parking = await simulateParking()

    if (!parking) {

        socket.emit("guest-access-denied", {
            message: "No hay parkings disponibles"
        })

        return
    }

    const tempData = {
        username,
        email: "temp@mail.com",
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

    await userModel.create(tempData)
    await parkingModel.findOneAndUpdate({ name: parking.name }, { active: true, status: "ocupado" })

    socket.emit("guest-access-ok", {
        message: `Hemos dejado una url en tu correo,
            debes ingresar a ella cuando abandones nuestro estacionamiento!`,
        place: user.parking
    })
}

export const guestExitController = async (socket, data) => {

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

export const renderGuestAccess = (req, res) => {
    res.render("guest/access")
}

export const renderGuestExit = (req, res) => {
    res.render("guest/exit")
}