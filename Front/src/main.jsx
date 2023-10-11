import React from "react";
import ReactDOM from "react-dom/client";
//import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import App from "./App";
import Login from "./auth/Login.jsx";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import ProtectedRoute from "./components/RouteProtector";
import Home from "./dashboard/Home";

//Creación del router ruta-elemento
// const router = createBrowserRouter([
//     { path: "/",          element: <Home /> },
//     { path: "dashboard",  element: <Home /> }, //Misma ruta para ambos
// ]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        {/* Incorporación del router
      <RouterProvider router={router}/> */}
        <BrowserRouter>
            <Routes>
                <Route path="/dashboard/*" element={<App />} />
                <Route path="/" element={<App />} />

                <Route path="/login" element={<Login />}></Route>
                <Route path="*" element={<Navigate to={"/"} replace/>}></Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
