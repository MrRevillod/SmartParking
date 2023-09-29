
import { app } from "./app.js"
import { PORT } from "./config/env.js"
import { dbConnect } from "./config/database.js"
import { socketSetup } from "./sockets.js"

const main = () => {

    dbConnect().then(() => {

        console.log("\n✅ Database: Conexión a MongoDB establecida")

        const server = app.listen(PORT, () => {
            console.log(`🚀 Servidor: Ejecutando en el puerto ${PORT}`)
            console.log(`🔄 Servidor: Esperando peticiones cliente\n`)
        })

        socketSetup(server)

    }).catch(() => {
        console.error("❌ Database: Conexión a MongoDB fallida")
    })
}

main()
