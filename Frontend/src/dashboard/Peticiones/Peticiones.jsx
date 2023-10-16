

import { useEffect, useState } from "react"

import "./peticiones.css"

import Cardy from "./cardy"


import { useSocket } from "../../App"




export default function Peticiones() {
    const [reservas, setReservas] = useState([])
    const socket = useSocket()

    useEffect(() => {

        const renderReservations = (data) => {
            console.log("ok")
            setReservas(data.reservations)
        }

        const newReserva = (data) => {
            setReservas([...reservas, data.reservation])

        }
        socket.emit("join-admin")
        socket.on("all-reservations", renderReservations)
        socket.on("new-reservation", newReserva)

        return () => {
            socket.off("all-reservations", renderReservations)
            socket.off("new-reservation", newReserva)
        }

    }, [reservas, socket])

    return (
        <div className=" w-full row justify-content-center ">
            <div className="text-center display-2 fw-bold m-3">Peticiones</div>

            <div className="w-50 mt-5  ">
                <div className="row  w-100 fs-3 rounded-top icon-blue backblue text-light  overflow-hidden   border-2    ">
                    <p className="col-4     ">Nombre</p>
                    <p className="col-4    border-2 border-start">Patente</p>
                    <p className="col-4    border-2  border-start">Estacionamiento</p>
                </div>

                <Cardy reservas={reservas} />
            </div>

        </div>
    )
}

