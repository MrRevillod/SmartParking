
import { MESSAGES } from "../utils/http.utils.js"
import { parkingModel } from "../models/parking.model.js"

export const findParking = async () => {

    const parking = await parkingModel.findOne({ active: false })
    if (!parking) return null

    return parking
}