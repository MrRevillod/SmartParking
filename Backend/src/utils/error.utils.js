
import fs from 'node:fs'
import path from 'node:path'

const getDate = () => {
    const fecha = new Date()
    const year = fecha.getFullYear()
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0')
    const day = fecha.getDate().toString().padStart(2, '0')
    const hours = fecha.getHours().toString().padStart(2, '0')
    const minutes = fecha.getMinutes().toString().padStart(2, '0')
    const seconds = fecha.getSeconds().toString().padStart(2, '0')
    return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`
}

export const saveError = (error) => {
    const actualDate = getDate()
    const fileName = `${actualDate}.txt`
    const fileRoute = path.join('./', 'logs', fileName)

    fs.appendFile(fileRoute, error.stack + '\n', (err) => {
        if (err) {
            console.error(err)
        }
    })
}