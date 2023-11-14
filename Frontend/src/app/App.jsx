

import { motion } from "framer-motion"
import { Routes, Route, useNavigate } from "react-router-dom"
import { useEffect, useLayoutEffect, useState } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import io from "socket.io-client"
import { SOCKET_URL } from "../lib/env"

import { Toast } from "../lib/Toast"
import { customUseTimeout } from "../lib/useTimeout"
import { validateSession } from "../lib/useValidateSession"

import { SocketContextProvider } from "../lib/socketContextProvider"

import { Home } from "./dashboard/Home.jsx"
import { Navbar } from "../components/Navbar.jsx"
import { Loading } from "../components/Loading.jsx"
import { Users } from "./dashboard/users/Users.jsx"
import { Stats } from "./dashboard/stats/Stats.jsx"
import { Parking } from "./dashboard/parking/Parking.jsx"


const queryClient = new QueryClient()
const socket = io(SOCKET_URL)

export const App = () => {
    const navigator = useNavigate()

    const [loaded, setLoaded] = useState(false)
    const [reservas, setReservas] = useState([])

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
            socket.emit("join-admin", { token: localStorage.getItem("token") })
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
            Toast({ msg: data })
        }
        socket.on("connect", onConnect)
        socket.on("disconnect", onDisconnect)
        socket.on("all-reservations", renderReservations)
        socket.on("new-reservation", newReserva)

        return () => {
            if (socket) {
                socket.off("all-reservations")
                socket.off("new-reservation")
                socket.off("all-parkings")
                socket.off("connect")
                socket.off("disconnect")
            }
        }
    }, [reservas])
    return (
        <SocketContextProvider socket={socket}>
            <div className="overflow-hidden">
                <Navbar />
                <div className="overflow-hidden position-absolute d-grid justify-content-end align-content-end opacity-25 p-3 pb-0" style={{ width: "100vw", height: "90vh", top: "10vh", zIndex: -10 }}>
                    <img src="../../auto.svg" className="w-75 opacity-50"></img>
                </div>
                {loaded ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        exit={{ opacity: 0 }}
                        className="z"
                    >
                        <QueryClientProvider client={queryClient}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/dashboard" element={<Home />} />
                                <Route path="/users" element={<Users />} />
                                <Route path="/parking" element={<Parking />} />
                                <Route path="/stats" element={<Stats reservas={reservas} />} />
                            </Routes>
                        </QueryClientProvider>
                    </motion.div>
                ) : (
                    <Loading />
                )}

            </div>
        </SocketContextProvider>)
}
