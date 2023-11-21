
import { useContext, useEffect, useState } from "react"

import { SocketContext } from "../../../lib/socketContext"


import "./Stats.css"
import { ToggleTableButton } from "../../../components/ToggleTableButton"
import { ReservationsTable } from "../../../components/ReservationsTable"
import { StatsTable } from "../../../components/StatsTable"






export const Stats = () => {
    const [reservas, setReservas] = useState([])
    const [logs, setLogs] = useState([])
    const [parkings, setParkings] = useState([])
    const [active, setActive] = useState(false)

    const socket = useContext(SocketContext)

    useEffect(() => {
        socket.emit('get-parkings')
        socket.emit("get-reservations")
        socket.emit("get-logs")
        
    },[socket])


    useEffect(() => {
        socket.on("all-reservations", (res) => {
            setReservas(res?.reservations)
        })
        socket.on('all-parkings', (data) => {
            const { parkings } = data
            setParkings(parkings)
        })

        socket.on("all-logs", (res) => {
            const { logs } = res
            console.log(logs)

            setLogs(logs)
        })
        return () => {
            socket.off("all-reservations")
            socket.off("all-logs")
            socket.off('all-parkings')

        }
    }, [socket, parkings, parkings.length])

    return (
        <div className="col w-full row justify-content-center   ">
            <div className="text-center display-2 fw-bold m-3 mt-5">Reservas</div>

            <div className="w-75 mt-2  ">
                <ToggleTableButton active={active} setActive={setActive} />
                {!active ? <ReservationsTable reservas={reservas} /> : <StatsTable logs={logs} parkings={parkings} />}
            </div>

        </div>
    )
}

