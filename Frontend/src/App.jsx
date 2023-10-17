import { Routes, Route, useNavigate } from "react-router-dom"
import {  useEffect, useLayoutEffect, useState } from "react"
import usTimeout from "./lib/useTimeout"
import { motion } from "framer-motion"

import NavBar from "./components/Navbar"
import Home from "./dashboard/Home.jsx"
import Usearch from "./dashboard/usearch/Usearch"
import Estacionamiento from "./dashboard/estacionamiento/Estacionamiento"

import UsuarioId from "./dashboard/usearch/usuario/UsuarioId"
import {Peticiones} from "./dashboard/Peticiones/Peticiones"
import Loading from "./components/Loading"

import validateSession from "./lib/useValidateSession"
import Toast from "./lib/Toast"
import {
    socket
} from "./socket"





export const App = () => {
    const [loaded, setLoaded] = useState(false)
    const [reservas, setReservas] = useState([])
    const [parkings, setParkings] = useState([])

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
        const onConnect = () =>{
            socket.emit("join-admin")
            Toast({msg:"Socket Connected"})
        }

        const onDisconnect = () =>{
            Toast({msg:"Socket Disconnected"})
        }

        const renderReservations = (data) => {
            setReservas(data.reservations)
        }

        const newReserva = (data) => {
            setReservas([...reservas, data.reservation])
            Toast({msg:"Nueva reserva"})
        }


        const renderParkings = (data) =>{
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
            socket.off("connect", onConnect)
            socket.off("disconnect", onDisconnect)
        }
    }, [reservas])

    return (
        <>
            <NavBar />         
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
                                element={<Estacionamiento  parkings={parkings}/>}
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
        </>

    )
}


