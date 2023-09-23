
import { userModel } from "../models/user.model.js"
import { MESSAGES } from "../utils/http.utils.js"

export const getActiveParking = async (req, res) => {

    try {

        let parking = await userModel.find({ activo: true, parking: { $ne: "" } })

        parking = parking.map(user => user.parking)
        res.status(200).json({ parking })

    } catch (error) {
        res.status(error?.status || 500).json({ message: error?.message || MESSAGES.UNEXPECTED })
    }
}

export const parkingCheckOut = async (req, res) => {

    try {

        const { id } = req.params
        const user = await userModel.findById({ _id: id })

        if (!user) throw { status: 401, message: MESSAGES.USER_NOT_FOUND }
        if (user.parking === "") throw { status: 401, message: MESSAGES.USER_NOT_IN_PARKING }

        user.parking = ""
        user.active = false

        await user.save()
        res.status(200).json({ message: MESSAGES.OK })

    } catch (error) {
        res.status(error?.status || 500).json({ message: error?.message || MESSAGES.UNEXPECTED })
    }
}