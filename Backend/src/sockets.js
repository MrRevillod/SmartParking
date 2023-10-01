
import { Server } from "socket.io"
import { verifyJwt } from "./utils/jwt.utils.js"
import { JWT_SECRET } from "./config/env.js"
import { userModel } from "./models/user.model.js"
import { hashPassword } from "./utils/bcrypt.utils.js"
import { parkingModel } from "./models/parking.model.js"

const simulateParking = () => {

    const random = Math.random()
    const parking = {
        name: "E-01",
        active: false
    }

    return random > 0.5 ? null : parking
}

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

        socket.on("access-request", async (data) => {

            const { username, patente, contact } = data

            // TO DO! hacer un controller de parking que 
            // permita encontrar el primer parking disponible (active: false)
            // y luego actualizarlo a active: true
            // obtener el name de ese parking y guardarlo en la constante place
            // si no hay parkings disponibles, retornar un mensaje de error con socket.emit

            const parking = simulateParking()

            if (!parking) {
                socket.emit("access-denied", { message: "No hay parkings disponibles" })
                console.log("No hay parkings disponibles")
                return
            }

            const place = parking.name

            const tempData = {
                username,
                email: "temp@mail.com",
                password: await hashPassword("temp"),
                role: "TEMP_ROLE",
                contact,
                active: true,
                parking: place,
                vehicles: [
                    {
                        patente,
                        model: "temp",
                        year: "temp"
                    }
                ]
            }

            const user = await userModel.create(tempData)

            socket.emit("access-ok", { message: "Acceso concedido", place: user.parking })

            // TO DO (idea) para marcar salida de las personas invitadas
            // podemos crear un one-time-link con un token el cual al clickearlo 
            // elimine al user temporal y cambie el estado del parking a active: false

            // lo elimino de la base de datos ahora (testing)
            await userModel.findByIdAndDelete(user._id)
        })
    })
}
