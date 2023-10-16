
import { verifyJwt } from "../utils/jwt.utils.js"
import { JWT_SECRET } from "../config/env.js"

import { userModel } from "../models/user.model.js"
import { parkingModel } from "../models/parking.model.js"
import { reservationModel } from "../models/reservation.model.js"

import { findParking, isInside } from "./parking.controller.js"

export const getReservations = async () => {
    const reservations = await reservationModel.find()
    return reservations ? reservations : null
}

export const hasReservation = async (userId, patente) => {
    const reservation = await reservationModel.findOne({ $or: [{ userId }, { patente }] })
    return reservation ? true : false
}

export const userReservationController = async (io, socket, data) => {

    const { token, patente } = data
    const { uid } = verifyJwt(token, JWT_SECRET)

    let user = await userModel.findById(uid)

    if (!user) {
        socket.emit("reservation-denied", {
            message: "Error interno"
        })

        return
    }

    const isIn = await isInside(user.id)
    const hasReserv = await hasReservation(user.id, patente)

    if (isIn || hasReserv) {
        socket.emit("reservation-denied", {
            message: "Ya tienes una reserva activa o te encuentras dentro de un estacionamiento"
        })

        return
    }

    const parking = await findParking()

    if (!parking) {
        socket.emit("reservation-denied", {
            message: "No hay estacionamientos disponibles"
        })

        return
    }

    const reservation = await reservationModel.create({
        userId: user.id,
        username: user.username,
        parkingId: parking.id,
        patente: patente,
        parking: parking.name
    })

    parking.active = true
    parking.status = "Reservado"
    await parking.save()

    user.active = true
    user.parking = parking.name
    await user.save()

    socket.emit("reservation-ok", {
        message: `Reserva aceptada para ${parking.name}`,
        reservation
    })

    io.to("administradores").emit("new-reservation", {
        reservation
    })
}

export const reservationCancelController = async (io, socket, data) => {

    const { token } = data
    const { uid } = verifyJwt(token, JWT_SECRET)

    const user = await userModel.findById(uid)

    if (!user) {
        socket.emit("reservation-denied", {
            message: "Error interno"
        })

        return
    }

    const reservation = await reservationModel.findOne({ userId: uid })

    if (!reservation) {
        socket.emit("reservation-cancel-denied", {
            message: "No tienes una reserva activa"
        })

        return
    }

    await parkingModel.findByIdAndUpdate(reservation.parkingId, {
        $set: {
            active: false,
            status: "Disponible"
        }
    })

    await reservationModel.findByIdAndDelete(reservation.id)

    user.active = false
    user.parking = ""
    await user.save()

    socket.emit("reservation-cancel-ok", {
        message: `Reserva cancelada para ${reservation.parking}`,
    })

    io.to("administradores").emit("all-reservations", {
        reservations: await getReservations()
    })
}

export const reservationArrivalController = async (io, socket, data) => {

    const { token } = data
    const { uid } = verifyJwt(token, JWT_SECRET)

    let user = await userModel.findById(uid)

    if (!user) {
        socket.emit("reservation-denied", {
            message: "Error interno"
        })

        return
    }

    const reservation = await reservationModel.findOne({ userId: uid })

    if (!reservation) {
        socket.emit("reservation-arrival-denied", {
            message: "No tienes una reserva activa"
        })

        return
    }

    await parkingModel.findByIdAndUpdate(reservation.parkingId, {
        $set: {
            active: false,
            status: "Disponible"
        }
    })

    await reservationModel.findByIdAndDelete(reservation.id)

    socket.emit("reservation-arrival-ok", {
        message: `Llegada confirmada a ${reservation.parking}`,
    })

    io.to("administradores").emit("all-reservations", {
        reservations: await getReservations()
    })
}