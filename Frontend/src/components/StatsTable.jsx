import { useEffect, useState } from "react"

import { LogsTable } from "./LogsTable"
import { StatusCircle2 } from "./StatusCircle2"
import { Chart } from "react-google-charts"


export const StatsTable = ({ logs, parkings }) => {

    const [disponibles, setDisponibles] = useState(0)
    const [reservados, setReservados] = useState(0)
    const [ocupados, setOcupados] = useState(0)
    const [total, setTotal] = useState(0)
    const [date, setDate] = useState({})



    useEffect(() => {
        const logsCount = (logS) => {
            logS.map((log) => {
                let fecha = log.access?.split(" ")
                fecha = fecha[0].split("/")
                fecha = fecha[0] + "/" + fecha[1]
                setDate({ ...date, [fecha]: date[fecha] ? date[fecha] + 1 : 1 })
            })

            console.log(Object.entries(date))
        }

        logsCount(logs)
        setTotal(parkings.length)

        const disp = parkings.filter(parking => parking.status === "disponible").length
        const res = parkings.filter(parking => parking.status === "reservado").length
        const ocu = parkings.filter(parking => parking.status === "ocupado").length

        if (total === 0) {
            setDisponibles(0)
            setReservados(0)
            setOcupados(0)
            return
        }

        setDisponibles(disp)
        setReservados(res)
        setOcupados(ocu)

    }, [parkings, total])

    return (
        <div className="row m-0 w-100 border-bottom p-0" style={{ height: '70vh ' }}>
            <div className="col-4">
                <LogsTable logs={logs} />
            </div>
            <div className="col-8 mt-1">
            <div className="back-blue text-light  border-bottom-0 p-2 fw-bold border">Informacion general</div>
                <div className=" h-50 row m-0 w-100">

                    <div className="col-6 h-100 p-0 row w-100 justify-content-center text-center ">
                        <div className="p-0 m-0 mt-3 fw-bold">Registro de Ingresos en los últimos 7 días</div>
                        <Chart
                            className="border m-0"
                            chartType="BarChart"
                            data={[["Fecha", "Ingresos"], ...(Object.entries(date).slice(-7))]}
                            width="600px"
                            height=""
                            options={{legend:"none"}}
                            legendToggle
                        />
                    </div>
                </div>
                <div className="border ">
                    <div className="row m-0 w-100   rounded-top-2 p-2 fw-semibold ">
                        <div className="col text-center">Disponibles ( {disponibles} )</div>
                        <div className="col text-center">Ocupados ( {ocupados} )</div>
                        <div className="col text-center">Reservados ( {reservados} )</div>
                    </div>
                    <div className="row m-0 w-100 p-3">
                        <StatusCircle2 label={"disponible"} percent={disponibles * 100 / total} />
                        <StatusCircle2 label={"ocupado"} percent={ocupados * 100 / total} />
                        <StatusCircle2 label={"reservado"} percent={reservados * 100 / total} />
                    </div>
                </div>
            </div>
        </div>
    )
}