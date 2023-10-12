
import { Schema, model } from 'mongoose'

const reservationSchema = new Schema({
    userId: {
        type: String,
        required: true
    },

    parkingId: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    patente: {
        type: String,
        required: true
    },

    parking: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true,
        default: "Esperando llegada"
    },
})

export const reservationModel = model("reservations", reservationSchema)