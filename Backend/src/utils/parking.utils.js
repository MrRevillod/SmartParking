
import { MESSAGES } from "../utils/http.utils.js"
import { parkingModel } from "../models/parking.model.js"

export const findParking = async () => {

    try {
        
        const parking = await parkingModel.findOne({ active: false })
        if(!parking) throw { status: 404, message: MESSAGES.PARKING_NOT_FOUND }

        res.status(200).json({ message: MESSAGES.OK, parking })

    } catch (error) {
        res.status(error?.status || 500).json({ message: error?.message || MESSAGES.UNEXPECTED })
    }

    return parking
}