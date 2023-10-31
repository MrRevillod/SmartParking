
import { logModel } from "../models/log.model.js"
import { formattedTime } from "../utils/date.utils.js"

export const getLogs = async () => {
    const logs = await logModel.find()
    return logs ? logs : null
}

export const userAccessLogController = async (socket, username, parking, patente) => {

    const ifExist = await logModel.findOne({ username, parking, access: { $ne: null }, exit: null })

    if (ifExist) {
        socket.emit("parking-access-denied", {
            message: "Recuerda que si quieres entrar a un estacionamiento debes salir del que te encuentras actualmente"
        })

        return
    }

    const logSchema = {
        username,
        parking,
        patente,
        access: formattedTime()
    }

    await logModel.create(logSchema)
}

export const userExitLogController = async (socket, username, parking) => {

    const log = await logModel.findOne({ username, parking, access: { $ne: null }, exit: null })

    if (!log) {
        socket.emit("guest-exit-denied", {
            message: "No se ha encontrado un registro de ingreso"
        })

        return
    }

    await logModel.findByIdAndUpdate(log.id, {
        exit: formattedTime()
    })
}