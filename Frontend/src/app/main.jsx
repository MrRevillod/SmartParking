import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"




import { App } from "./App"
import { Login } from "./auth/Login"

import "./Main.css"
import "bootstrap/dist/css/bootstrap.css"

ReactDOM.createRoot(document.getElementById("root")).render(
    
        <React.StrictMode>
            <BrowserRouter>
                <Routes>

                    <Route path="/dashboard/*" element={<App />} />
                    <Route path="/" element={<App />} />
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="*" element={<Navigate to={"/"} replace />}></Route>
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    
)
