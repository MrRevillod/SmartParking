
import cors from "cors"
import express from "express"
import router from "./routes/index.js"
import fileUpload from "express-fileupload"

import { PUBLIC_URL, UPLOADS_PATH, VIEWS_PATH } from "./config/env.js"

export const app = express()

app.use(cors())
app.use(express.json())

app.use(fileUpload({
    useTempfiles: true,
    tempFileDir: UPLOADS_PATH
}))

app.use(express.static("public"))

app.set("views", VIEWS_PATH)
app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: true }))
app.use(router)

app.use((req, res) => {
    res.status(404).render('404', { title: '404 - Página no encontrada', baseUrl: PUBLIC_URL })
})
