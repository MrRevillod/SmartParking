
import cors from "cors"
import express from "express"
import router from "./routes/index.js"
import cookieParser from "cookie-parser"

export const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use(express.urlencoded({ extended: true }))
app.use(router)
