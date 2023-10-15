
import { Server } from "socket.io"

import { guestAccessController, guestExitController } from "./sockets/guest.controller.js"
import { getParkings, parkingAccessController, parkingExitController } from "./sockets/parking.controller.js"
import { getReservations, reservationCancelController, userReservationController, reservationArrivalController } from "./sockets/reservation.controller.js"

export const socketSetup = (server) => {

    // ! TO DO

    // * Crear un controller (no req, res) en sockets/parking.controller
    // * debe retornar todos los estacionamientos (usar .find()) 
    // * llamarlo en el evento "join-admin" y emitirlo a "administradores"
    // * emitirlo cada vez que haya un cambio en el ingreso, reserva, salida o cancelación de un estacionamiento
    // * basicamente en la mayoría de los sockets actuales

    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        }
    })

    io.on("connection", async (socket) => {

        socket.on("join-admin", async () => {

            socket.join("administradores")

            io.to("administradores").emit("all-parkings", {
                parkings: await getParkings()
            })

            io.to("administradores").emit("all-reservations", {
                reservations: await getReservations()
            })
        })

        socket.on("guest-access-request", async (data) => {
            await guestAccessController(socket, data)
        })

        socket.on("guest-exit-request", async (data) => {
            await guestExitController(socket, data)
        })

        socket.on("user-reservation-req", async (data) => {
            await userReservationController(io, socket, data)
        })

        socket.on("user-cancel-reservation", async (data) => {
            await reservationCancelController(io, socket, data)
        })

        socket.on("user-reservation-arrival", async (data) => {
            await reservationArrivalController(io, socket, data)
        })

        socket.on("user-access-req", async (data) => {
            await parkingAccessController(io, socket, data)
        })

        socket.on("user-exit-req", async (data) => {
            await parkingExitController(io, socket, data)
        })
    })
}
