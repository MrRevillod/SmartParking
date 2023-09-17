
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
        default: "http://localhost:3000/images/default.jpg"
    },

    vehicles: [vehicleSchema]

},
    { timestamps: true, versionKey: false }
)

export const userModel = model("users", userSchema)
