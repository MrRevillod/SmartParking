
import { MESSAGES } from "../utils/http.utils.js"
import { saveError } from "../utils/error.utils.js"
import { parkingModel } from "../models/parking.model.js"

export const getParkings = async (req, res) => {

    try {

        const parkings = await parkingModel.find()
        if (!parkings) throw { status: 404, message: MESSAGES.PARKING_NOT_FOUND }

        res.status(200).json({ message: MESSAGES.OK, parkings })

    } catch (error) {
        res.status(error?.status || 500).json({ message: error?.message || MESSAGES.UNEXPECTED })
        saveError(error)
    }
}

export const getParking = async (req, res) => {

    try {

        const id = req.params.id

        const parking = await parkingModel.findById({ _id: id })
        if (!parking) throw { status: 404, message: MESSAGES.PARKING_NOT_FOUND }

        res.status(200).json({ message: MESSAGES.OK, parking })

    } catch (error) {
        res.status(error?.status || 500).json({ message: error?.message || MESSAGES.UNEXPECTED })
        saveError(error)
    }
}
