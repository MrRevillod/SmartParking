
import { userModel } from "../models/user.model.js"
import { verifyJwt } from "../utils/jwt.utils.js"

export const validateAdmin = async (socket, token) => {

    try {

        const { id } = verifyJwt(token)
        const user = await userModel.findById(id)

        if (!user) {
            socket.emit("error", "Error al validar la solicitud")
            return false
        }

        if (user.role !== "ADMIN_ROLE") {
            socket.emit("error", "Error al validar la solicitud")
            return false
        }

        return true

    } catch (error) {
        socket.emit("error", "Error al validar la solicitud")
        return false
    }
}