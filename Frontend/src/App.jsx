
import { socket } from "./socket"
import { motion } from "framer-motion"
import { Routes, Route, useNavigate } from "react-router-dom"
import { useEffect, useLayoutEffect, useState } from "react"

import { Toast } from "./lib/Toast"
import { customUseTimeout } from "./lib/useTimeout"
import { validateSession } from "./lib/useValidateSession"

import { Inicio } from "./Panel/Inicio"
import { Navbar } from "./components/Navbar"
import { Loading } from "./components/Loading"
import { Usearch } from "./Panel/usearch/Usearch"
import { UsuarioId } from "./Panel/usearch/usuario/UsuarioId"
import { Peticiones } from "./Panel/Peticiones/Reservas"
import { Estacionamiento } from "./Panel/estacionamiento/Estacionamiento"

export const App = () => {

    const navigator = useNavigate()

    const [loaded, setLoaded] = useState(false)
    const [reservas, setReservas] = useState([])
    const [parkings, setParkings] = useState([])

    useLayoutEffect(() => {

        const validation = async () => {

            setLoaded(false)
            const validated = await validateSession()
            await customUseTimeout(1000)

            if (!validated) {
                navigator("/login")
                Toast({ msg: "Debes iniciar sesión" })
                socket.disconnect()
            } else {
                setLoaded(true)
            }
        }

        validation()

    }, [navigator])

    useEffect(() => {

        socket.connect()

        const onConnect = () => {
            socket.emit("join-admin")
            Toast({ msg: "Socket Connected" })
        }

        const onDisconnect = () => {
            Toast({ msg: "Socket Disconnected" })
        }

        const renderReservations = (data) => {
            setReservas(data.reservations)
        }

        const newReserva = (data) => {
            setReservas([...reservas, data.reservation])
            Toast({ msg: "Nueva reserva" })
        }


        const renderParkings = (data) => {
            setParkings(data.parkings)
        }

        socket.on("connect", onConnect)
        socket.on("disconnect", onDisconnect)
        socket.on("all-reservations", renderReservations)
        socket.on("new-reservation", newReserva)
        socket.on("all-parkings", renderParkings)

        return () => {
            socket.off("all-reservations", renderReservations)
            socket.off("new-reservation", newReserva)
            socket.off("all-parkings", renderParkings)
            socket.off("connect", onConnect)
            socket.off("disconnect", onDisconnect)
        }

    }, [reservas])

    return (
        <div className="overflow-hidden">
            <Navbar />
            <div className="overflow-hidden position-absolute d-grid justify-content-end align-content-end opacity-25 p-3 pb-0" style={{ width: "100vw", height: "90vh", top: "10vh", zIndex: -10 }}>
                <img src="../../public/auto.svg" className="w-75 opacity-50"></img>
            </div>

            {loaded ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    exit={{ opacity: 0 }}
                    className="z"
                >
                    <Routes>
                        <Route path="/" element={<Inicio />} />
                        <Route path="/usearch" element={<Usearch />} />
                        <Route path="/usearch/:id" element={<UsuarioId />} />
                        <Route
                            path="/estacionamiento"
                            element={<Estacionamiento parkings={parkings} />}
                        />

                        <Route
                            path="/peticiones"
                            element={<Peticiones reservas={reservas} />}
                        />
                    </Routes>
                </motion.div>
            ) : (
                <Loading />
            )}
        </div>
    )
}
