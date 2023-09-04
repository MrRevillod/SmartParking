
import { connect } from "mongoose"
import { MDB_ATLAS_URI, MDB_LOCAL_URI, MODE } from "./env.js"

const URI = MODE === "DEVELOPMENT" ? MDB_LOCAL_URI : MDB_ATLAS_URI

export const dbConnect = async () => {

    try {
        await connect(URI)
    } catch (error) {
        console.log(error)
    }
}
