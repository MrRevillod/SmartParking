
import { model, Schema } from "mongoose"

// userSchema es una struct base del usuario
// es requerida para realizar operaciones en la base de datos
// ejemplo: userModel.findById()

const vehicleSchema = new Schema({

    patente: {
        type: String, required: true, unique: true
    },

    model: {
        type: String, required: true, unique: false
    },

    year: {
        type: String, required: true, unique: false
    }
})

const userSchema = new Schema({

    username: {
        type: String, required: true, unique: true
    },

    email: {
        type: String, required: true, unique: true
    },

    password: {
        type: String, required: true, unique: false
    },

    role: {
        type: String, unique: false, default: "USER_ROLE"
    },

    validated: {
        type: Boolean, default: false, unique: false
    },

    profilePicture: {
        type: String,
        unique: false,
        default: "http://localhost:3000/images/default.jpeg"
    },

    contact: {
        type: String, required: true ,unique: true
    },

    active: {
        type: Boolean, default: false, unique: false
    },

    parking: {
        type: String, unique: false, default: ""
    },

    vehicles: [vehicleSchema],

    verificationCode : {
        type: Number, required: false, unique: true
    }

},
    { timestamps: true, versionKey: false }
)

export const userModel = model("users", userSchema)
