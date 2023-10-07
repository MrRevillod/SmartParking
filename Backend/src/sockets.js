
import { Server } from "socket.io"
import { saveTempUser } from "./controllers/sockets.controllers.js"

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
            await saveTempUser(socket, data)
        })
    })
}
