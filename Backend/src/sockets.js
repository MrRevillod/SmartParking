
import { Server } from "socket.io"
import { userModel } from "./models/user.model.js"
import { verifyJwt } from "./utils/jwt.utils.js"
import { JWT_SECRET } from "./config/env.js"
import { simulateParking } from "./utils/parking.utils.js"
import { guestAccessController, guestExitController } from "./controllers/guest.controllers.js"

export const socketSetup = (server) => {

    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        }
    })

    io.on("connection", async (socket) => {
        socket.on("disconnect", () => {
            console.log(`🔌 Socket: Cliente desconectado [id: ${socket.id}]`)
        })

        socket.on("guest-access-request", async (data) => {
            await guestAccessController(socket, data)
        })

        socket.on("guest-exit-request", async (data) => {
            await guestExitController(socket, data)
        })

        socket.on("reservation", async ({ token }) => {

            // desde el front recibo el token del user que quiere reservar
            // y lo identifico

            const { uid } = verifyJwt(token, JWT_SECRET)
            const user = userModel.findById(uid)

            // si no existe envío un error, 
            // es solo para asegurar, ya que debería existir.

            if (!user) {
                socket.emit("reservation-denied", {
                    message: "Error interno"
                })
            }

            // uso la función de simulación de obtención de estacionamiento 

            const parking = await simulateParking()

            // si no hay estacionamiento disp envio un evento 
            // "reservation-denied" al user

            if (!parking) {
                socket.emit("reservation-denied", {
                    message: "No hay espacios disponibles"
                })
            }

            // de lo contrario envío un evento ok y 
            // el nombre del estacionamiento a reservar

            socket.emit("reservation-ok", {
                message: "La reserva se ha realizado de manera correcta.",
                place: parking.name
            })

            // TO DO!

            // ahora se debe cambiar el estado de user a activo 
            // y asignarle el nombre del parking que está utilizando

            // Luego algo similar con el parking, encuentras el doc que 
            // coincide con el nombre con simulateParking y cambias active = true
            // status = "reservado" (operación $set o update de mongoose)

            // TO DO! 

            // al finalizar y probar esta logica con el /public/reservas/index.html 
            // mover la logica y funcionalidad al fichero sockets.controllers.js

            // el fichero index no está estilizado, se puede hacer y puede contar como tarea

            // independiente de esto hay que pensar en una forma de cambiar el estado de 
            // reservado a ocupado cuando la persona llegue, siguiendo la logica de correos que hemos usado
            // se podría hacer así, pero no se si sea lo mejor, eso tmb podría ser otra tarea.

        })
    })
}
