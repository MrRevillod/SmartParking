
import { model, Schema } from "mongoose"

// TO DO !
// Añadir la subcolleción de vehiculos al schema de usuario
// Revisar diagrama de clases

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
    }

},
    { timestamps: true, versionKey: false }
)

export const userModel = model("users", userSchema)
