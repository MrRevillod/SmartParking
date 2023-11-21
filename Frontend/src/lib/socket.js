
import { SOCKET_URL } from "./env.js"
import io from "socket.io-client"

const socket = io(SOCKET_URL)

export const initSocket = (token) => {
    socket.emit('join-admin', { token: token })    
    return socket
}

