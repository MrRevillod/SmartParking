
import { Schema, model } from "mongoose"

const parkingSchema = new Schema({

    name: {
        type: String, required: true, unique: true
    },

    active: {
        type: Boolean, default: false, unique: false
    },

    status: {
        type: String, default: "Disponible", unique: false
    }
})

export const parkingModel = model("parkings", parkingSchema)