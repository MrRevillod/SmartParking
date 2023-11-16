
import { Server } from "socket.io"
import { getLogs } from "./sockets/log.controller.js"
import { validateAdmin } from "./sockets/sockets.mw.js"
import { guestAccessController, guestExitController } from "./sockets/guest.controller.js"
import { getParkings, parkingAccessController, parkingExitController } from "./sockets/parking.controller.js"
import { getReservations, reservationCancelController, userReservationController, reservationArrivalController } from "./sockets/reservation.controller.js"

export const socketSetup = (server) => {

    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        }
    })

    io.on("connection", async (socket) => {

        socket.emit("parking-status", {
            status: await getParkings() ? "NOT-FULL" : "FULL"
        })

        socket.on("join-admin", async (data) => {

            const { token } = data

            if (!await validateAdmin(socket, token)) {
                socket.emit("error", "Error al validar la solicitud")
            }

            socket.join("administradores")
        })

        socket.on("get-parkings", async (data) => {

            io.to("administradores").emit("all-parkings", {
                parkings: await getParkings()
            })
        })

        socket.on("get-reservations", async (data) => {

            io.to("administradores").emit("all-reservations", {
                reservations: await getReservations()
            })
        })

        socket.on("get-users", async (data) => {

            io.to("administradores").emit("all-users", {
                users: await userModel.find({
                    $or: [{ role: "USER_ROLE" }, { role: "TEMP_ROLE" }]
                })
            })
        })

        socket.on("get-logs", async (data) => {

            io.to("administradores").emit("all-logs", {
                logs: await getLogs()
            })
        })

        socket.on("guest-access-request", async (data) => {
            await guestAccessController(io, socket, data)
        })

        socket.on("guest-exit-request", async (data) => {
            await guestExitController(io, socket, data)
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
