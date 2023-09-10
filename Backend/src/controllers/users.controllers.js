
import { MESSAGES } from "../utils/http.utils.js"

export const uploadAvatarController = async (req, res) => {

    try {

        if (!req.foundUser) throw { status: 500, message: MESSAGES.UNEXPECTED }
        let user = req.foundUser





        user.profilePicture

    } catch (error) {
        res.status(error?.status || 500).json({ message: error?.message || MESSAGES.UNEXPECTED })
    }
}