
import { Schema, model } from "mongoose"

const logSchema = new Schema({

    username: {
        type: String, required: true
    },

    parking: {
        type: String, required: true
    },

    access: {
        type: String, default: null
    },

    exit: {
        type: String, default: null
    },

    patente: {
        type: String, required: true
    }
})

export const logModel = model("logs", logSchema)