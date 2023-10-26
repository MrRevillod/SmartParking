
import "dotenv/config"
import path from "node:path"

const PORT = process.env.PORT || 3001
const MODE = process.env.MODE || "DEVELOPMENT"

const MDB_PROD_URI = process.env.MDB_PROD_URI || "MONGODB_URI"
const MDB_LOCAL_URI = process.env.MDB_LOCAL_URI || "MONGODB_URI"
const MDB_DOCKER_URI = process.env.MDB_DOCKER_URI || "MONGODB_URI"

const DB_NAME = process.env.DB_NAME || "DB_NAME"
const JWT_SECRET = process.env.JWT_SECRET || "MY_SECRET"

const MAIL = process.env.MAIL_ADRESS || "MAIL"
const MAIL_PASSWORD = process.env.MAIL_PASSWORD || "MAIL_PASSWORD"

const VIEWS_PATH = path.join(process.cwd(), "src/views")
const UPLOADS_PATH = path.join(process.cwd(), "uploads")
const PUBLIC_PATH = path.join(process.cwd(), "public")
const PUBLIC_URL = `http://localhost:${PORT}`

// Se exportan las constantes individualmente
// Método de uso:
// import { CONSTANTE } from "/src/config/env.js"   

export {
    PORT, MODE,
    MDB_LOCAL_URI,
    MDB_PROD_URI,
    MDB_DOCKER_URI,
    DB_NAME,
    JWT_SECRET,
    VIEWS_PATH,
    PUBLIC_PATH,
    UPLOADS_PATH,
    PUBLIC_URL,
    MAIL,
    MAIL_PASSWORD
}