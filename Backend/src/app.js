
import cors from "cors"
import express from "express"
import router from "./routes/index.js"
import fileUpload from "express-fileupload"

import { UPLOADS_PATH, VIEWS_PATH } from "./config/env.js"

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
