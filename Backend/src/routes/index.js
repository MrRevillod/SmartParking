
import { Router } from "express"
import { readdirSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const router = Router()

// Obtener la ruta de este fichero actual (./src/routes/index.js)
const currentModuleUrl = import.meta.url
const currentModulePath = fileURLToPath(currentModuleUrl)
const ROUTER_PATH = join(dirname(currentModulePath)) // (1)

// console.log(`1 = ${currentModuleUrl} \n2 = ${currentModulePath} \n3 = ${ROUTER_PATH}\n`)

// Función para limpiar el nombre del archivo (eliminar extensión)
const getCleanFilename = (filename) => filename.split(".").shift()

// Iterar a través de los archivos en el directorio e importando
// sus rutas internas excluyendo index (actual)

readdirSync(ROUTER_PATH).forEach((filename) => {

    const cleanFilename = getCleanFilename(filename)

    if (cleanFilename !== "index") {

        import(`./${cleanFilename}.js`).then((routerModule) => {
            router.use(`/api/${cleanFilename}`, routerModule.default)

        }).catch((error) => {
            console.error("Router: Error importando rutas")
            console.log(error)
        })
    }
})

export default router