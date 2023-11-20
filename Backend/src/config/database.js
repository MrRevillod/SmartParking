
import { connect } from "mongoose"
import { MESSAGES } from "../utils/http.utils.js"
import { DB_NAME, URI } from "./env.js"

export const dbConnect = async () => {

    try {
        return await connect(URI, { dbName: DB_NAME })
    } catch (error) {
        throw { status: 500, message: MESSAGES.UNEXPECTED }
    }
}