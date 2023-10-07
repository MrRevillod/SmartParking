
import { connect } from "mongoose"
import { DB_NAME, MDB_PROD_URI, MDB_LOCAL_URI, MODE } from "./env.js"
import { MESSAGES } from "../utils/http.utils.js"

const URI = MODE === "DEVELOPMENT" ? MDB_LOCAL_URI : MDB_PROD_URI

// Función para conectarse a una base de datos MongoDB
// retorna una promesa, al resolver resulta en una conexión exitosa
export const dbConnect = async () => {

    try {
        return await connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: DB_NAME,
        })

    } catch (error) {
        throw { status: 500, message: MESSAGES.UNEXPECTED }
    }
}