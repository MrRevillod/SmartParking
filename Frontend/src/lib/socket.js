
import { SOCKET_URL } from "./env.js"

import io from "socket.io-client"
export const socket = io(SOCKET_URL)
