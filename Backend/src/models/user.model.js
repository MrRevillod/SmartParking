
import { model, Schema } from "mongoose"

// TO DO !
// Añadir la subcolleción de vehiculos al schema de usuario
// Revisar diagrama de clases

const vehicleSchema = new Schema({

    patente: {
        type: String, required: true, unique: true
    },

    model: {
        type: String, required: true, unique: true
    },

    year: {
        type: String, required: true
    }
})

// userSchema es una struct base del usuario
// es requerida para realizar operaciones en la base de datos
// ejemplo: userModel.findById()

const userSchema = new Schema({

    username: {
        type: String, required: true, unique: true
    },

    email: {
        type: String, required: true, unique: true
    },

    password: {
        type: String, required: true, unique: true
    },

    role: {
        type: String, required: true, default: "USER_ROLE"
    },

    validated: {
        type: Boolean, required: true, default: false
    },

    profilePicture: {
        type: String, default: true
    },

    vehicles: [vehicleSchema]

},
    { timestamps: true, versionKey: false }
)

export const userModel = model("users", userSchema)
