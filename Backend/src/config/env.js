
import "dotenv/config"
import path from "node:path"

// Variables de entorno importadas desde .env

// PORT: Puerto a utilizar para servir la aplicación
// MODE: Modo de ejecución de la aplicación

// MDB_LOCAL_URI: String de conexión local a mongodb
// MDB_ATLAS_URI: String de conexión a producción en mongodb

// JWT_SECRET: Clave encriptación de los tokens
// RESEND_KEY: API KEY de resend para enviar y manejar envío de correos

// VIEWS_PATH: Path de la carpeta src/views 
// (almacena los ficheros estaticos que renderizará el servidor)

const PORT = process.env.PORT || 3001
const MODE = process.env.MODE || "DEVELOPMENT"

const MDB_LOCAL_URI = process.env.MDB_LOCAL_URI || "MONGODB_URI"
const MDB_ATLAS_URI = process.env.MDB_ATLAS_URI || "MONGODB_URI"

const JWT_SECRET = process.env.JWT_SECRET || "MY_SECRET"
const JWT_REFRESH_SECRET = process.env.REFRESH_SECRET || "MY_REFRESH_SECRET"

const RESEND_KEY = process.env.RESEND_KEY || "RESEND_KEY"

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
    MDB_ATLAS_URI,
    JWT_SECRET,
    JWT_REFRESH_SECRET,
    RESEND_KEY,
    VIEWS_PATH,
    PUBLIC_PATH,
    UPLOADS_PATH,
    PUBLIC_URL
}
