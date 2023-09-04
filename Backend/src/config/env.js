
import "dotenv/config"
import path from "node:path"

const PORT = process.env.PORT || 3001
const MODE = process.env.MODE || "DEVELOPMENT"

const MDB_LOCAL_URI = process.env.MDB_LOCAL_URI || "MONGODB_URI"
const MDB_ATLAS_URI = process.env.MDB_ATLAS_URI || "MONGODB_URI"

const JWT_SECRET = process.env.JWT_SECRET || "MY_SECRET"
const JWT_REFRESH_SECRET = process.env.REFRESH_SECRET || "MY_REFRESH_SECRET"

const RESEND_KEY = process.env.RESEND_KEY || "RESEND_KEY"
const VIEWS_PATH = path.join(process.cwd(), "src/views")

export {
    PORT, MODE,
    MDB_LOCAL_URI,
    MDB_ATLAS_URI,
    JWT_SECRET,
    JWT_REFRESH_SECRET,
    RESEND_KEY,
    VIEWS_PATH
}

