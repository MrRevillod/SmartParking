import { Routes, Route, useNavigate } from "react-router-dom"
import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react"
import usTimeout from "./lib/useTimeout"
import { motion } from "framer-motion"

import NavBar from "./components/Navbar"
import Home from "./dashboard/Home.jsx"
import Usearch from "./dashboard/usearch/Usearch"
import Estacionamiento from "./dashboard/estacionamiento/Estacionamiento"
import Mensajes from "./dashboard/mensajes/Mensajes"
import UsuarioId from "./dashboard/usearch/usuario/UsuarioId"
import Peticiones from "./dashboard/Peticiones/Peticiones"
import Loading from "./components/Loading"

import validateSession from "./lib/useValidateSession"
import Toast from "./lib/Toast"
import {
    socket
} from "./socket"


const SocketContext = createContext(socket)

export const App = () => {
    const [loaded, setLoaded] = useState(false)
    const navigator = useNavigate()

    useLayoutEffect(() => {
        const validation = async () => {
            setLoaded(false)
            const validated = await validateSession()
            await usTimeout(1000)
            if (!validated) {
                navigator("/login")
                Toast({ msg: "Debes iniciar sesión" })
            } else {
                setLoaded(true)
            }
        }
        validation()
    }, [navigator])

    useEffect(() => {
        socket.connect()
        socket.emit("join-admin")

        socket.on("new-reservation", () => {
            Toast({ msg: "Nueva reserva" })
        })

        return () => {
            socket.disconnect()
            socket.off("new-reservation")

        }
    }, [])

    return (
        <>
            <NavBar />
            <SocketContext.Provider value={socket}>
                {loaded ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        exit={{ opacity: 0 }}
                    >
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/usearch" element={<Usearch />} />
                            <Route path="/usearch/:id" element={<UsuarioId />} />
                            <Route
                                path="/estacionamiento"
                                element={<Estacionamiento />}
                            />
                            <Route path="/mensajes" element={<Mensajes />} />
                            <Route path="/usuario" element={<Mensajes />} />
                            <Route
                                path="/peticiones"
                                element={<Peticiones />}
                            />
                        </Routes>
                    </motion.div>
                ) : (
                    <Loading />
                )}
            </SocketContext.Provider>
        </>

    )
}



export const useSocket = () => useContext(SocketContext)