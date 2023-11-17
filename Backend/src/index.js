
import { app } from "./app.js"
import { dbConnect } from "./config/database.js"
import { socketSetup } from "./sockets.js"
import { PORT, PUBLIC_URL } from "./config/env.js"

dbConnect().then(() => {

    console.log("\n🖥️  Base de datos: Conexión exitosa a mongodb")
    console.log("🔄 Base de datos: Esperando peticiones cliente\n")

    const server = app.listen(PORT, () => {
        console.log(`🔗 Servidor: Ejecutando en ${PUBLIC_URL}`)
        console.log(`🔄 Servidor: Esperando peticiones cliente\n`)
    })

    socketSetup(server)

}).catch((error) => {
    console.error("\n❌ Servidor: Servidor no iniciado")
    console.error("❌ Database: Conexión a MongoDB fallida\n")
    console.error("❌ Database: ", error)
})
