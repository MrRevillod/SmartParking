
import { connect } from "mongoose"
import { DB_NAME, MDB_PROD_URI, MDB_LOCAL_URI, MDB_DOCKER_URI, MODE } from "./env.js"
import { MESSAGES } from "../utils/http.utils.js"

const URIS = {
    "DOCKER": MDB_DOCKER_URI,
    "PRODUCTION": MDB_PROD_URI,
    "DEVELOPMENT": MDB_LOCAL_URI
}

const URI = URIS[MODE]

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