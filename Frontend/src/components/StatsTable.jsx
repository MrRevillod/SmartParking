import { useEffect, useState } from "react"

import { LogsTable } from "./LogsTable"
import { StatusCircle2 } from "./StatusCircle2"
import { LogChart } from "./LogChart"


const parseData = (data) => {
    let dictData = {}
    let res = []

    data.map((log) => {
        let date = log.access.split(" ")[0]
        if (dictData[date]) {
            dictData[date]++
        } else {
            dictData[date] = 1
        }
    })
    for (const [key, value] of Object.entries(dictData)) { 
        res.push({ name: key, value: value })
    }
    return res

}

export const StatsTable = ({ logs, parkings }) => {

    let data = parseData(logs)


    const [disponibles, setDisponibles] = useState(0)
    const [reservados, setReservados] = useState(0)
    const [ocupados, setOcupados] = useState(0)


    const [total, setTotal] = useState(0)

    useEffect(() => {
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
        <div className="row m-0 w-100  p-0 " style={{ height: '67vh ' }}>
            <div className="col-4">
                <LogsTable logs={logs} />
            </div>
            <div className="col-8 mt-1">
            <div className="back-blue text-light text-center  border-bottom-0 p-2 fw-bold border">Registro de Ingresos en los últimos 7 días</div>
                <div className="  row m-0 w-100">

                    <div className="col-6 h-100 p-0 pt-3 row w-100 justify-content-center text-center ">
                        {/* <div className="p-0 m-0 mt-1 fw-bold"></div> */}
                        <LogChart logs={data} />
        
                    </div>
                </div>
                <div className="mt-4 ">
                    <div className="row m-0 w-100  p-1">
                        <StatusCircle2 label={"disponible"} percent={disponibles * 100 / total} />
                        <StatusCircle2 label={"ocupado"} percent={ocupados * 100 / total} />
                        <StatusCircle2 label={"reservado"} percent={reservados * 100 / total} />
                    </div>
                    <div className="row m-0 w-100    rounded-top-2   ">
                        <div className="col text-center text-secondary">Disponibles ( {disponibles} )</div>
                        <div className="col text-center text-danger">Ocupados ( {ocupados} )</div>
                        <div className="col text-center text-primary">Reservados ( {reservados} )</div>
                    </div>
                </div>
            </div>
        </div>
    )
}