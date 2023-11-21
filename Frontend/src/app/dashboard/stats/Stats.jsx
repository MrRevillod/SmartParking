
import { useContext, useEffect, useState } from "react"

import { SocketContext } from "../../../lib/socketContext"


import "./Stats.css"
import { ToggleTableButton } from "../../../components/ToggleTableButton"
import { ReservationsTable } from "../../../components/ReservationsTable"
import { StatsTable } from "../../../components/StatsTable"






export const Stats = ({reservas,parkings}) => {

    const [active, setActive] = useState(false)

    const [logs,setLogs] = useState([])
    const socket = useContext(SocketContext)

    useEffect(() => {

        socket.emit("get-logs")
        
    },[socket])


    useEffect(() => {
        socket.on("all-logs", (res) => {
            const { logs } = res
            setLogs(logs)
        })
        return () => {

            socket.off("all-logs")


        }
    }, [socket])

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

