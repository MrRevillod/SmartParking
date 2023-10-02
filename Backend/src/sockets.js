import { Server } from "socket.io"
import { verifyJwt } from "./utils/jwt.utils.js"
import { JWT_SECRET } from "./config/env.js"
import { userModel } from "./models/user.model.js"
import cors from "cors"
export const socketSetup = (server) => {

    const io = new Server(server,{
        cors:{
            origin: "*", // Reemplaza esto con la URL del sitio externo permitido si es necesario
            methods: ["GET", "POST"], 
        }
    })



    io.use((socket, next) => {

        try {

            const token = socket.handshake.auth.token
            const user = verifyJwt(token, JWT_SECRET)

            socket.userId = user.uid
            return next()

        } catch (error) {
            return next(new Error("No autorizado"))
        }
    })

    io.use(async (socket, next) => {

        try {

            const { role } = await userModel.findById(socket.userId, { role: 1, _id: 0 })
            console.log(role)
            return next() 

        } catch (error) {
            return next(new Error("No autorizado"))
        }
    })

    io.on("connection", (socket) => {
        socket.emit("welcome","bienvenido al server-socket")
        console.log(`🔌 Socket: Cliente conectado [id: ${socket.id}]`)
        socket.on("disconnect", () => {
            console.log(`🔌 Socket: Cliente desconectado [id: ${socket.id}]`)
        })
    })
}

