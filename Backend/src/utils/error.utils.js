
import fs from 'node:fs'
import path from 'node:path'

const getDate = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export const saveError = (error) => {

    const formatedError = error instanceof Error ? error : new Error(error)

    const actualDate = getDate()
    const logFileName = 'sp_logs.txt'
    const logFilePath = path.join('./', 'logs', logFileName)

    if (!fs.existsSync(path.dirname(logFilePath))) {
        fs.mkdirSync(path.dirname(logFilePath), { recursive: true })
    }

    const errorMessage = `${actualDate}\n\n${error?.message || "Sin mensaje"} - ${error?.status || "Sin código de error"} \n\n${formatedError.stack}\n\n`

    fs.appendFile(logFilePath, errorMessage, (err) => {
        if (err) {
            console.error('Error al guardar el log:', err)
        }
    })
}
