
import { useEffect, useState } from "react"



import { Legend } from "../../../components/Legend"
import { ParkingMap } from "../../../components/ParkingMap"
import { StatusCircle2 } from "../../../components/StatusCircle2"

import "./Parking.css"

export const Parking = ({ parkings }) => {
    const [disponibles, setDisponibles] = useState(0)
    const [reservados, setReservados] = useState(0)
    const [ocupados, setOcupados] = useState(0)

    useEffect(() => {
        const total = parkings.length
        const disp = parkings.filter(parking => parking.status === "disponible").length
        const res = parkings.filter(parking => parking.status === "reservado").length
        const ocu = parkings.filter(parking => parking.status === "ocupado").length

        if (total === 0) {
            setDisponibles(0)
            setReservados(0)
            setOcupados(0)
            return
        }

        setDisponibles(disp * 100 / total)
        setReservados(res * 100 / total)
        setOcupados(ocu * 100 / total)

    }, [parkings])





    return (
        <div className='row w-100'>
            <div className='col d-grid align-content-center justify-content-center'>

                <h1 className="text-center display-3 fw-bold mt-5">Estacionamiento</h1>
                <p className="text-center fs-5">Estado de los estacionamientos</p>

                <div className="row py-5">
                    <StatusCircle2 percent={ocupados} label={"ocupado"} />
                    <StatusCircle2 percent={disponibles} label={"disponible"} />
                    <StatusCircle2 percent={reservados} label={"reservado"} />

                </div>
                <div className="row border rounded">
                    <Legend status={"ocupado"} />
                    <Legend status={"disponible"} />
                    <Legend status={"reservado"} />
                </div>

            </div>
            <ParkingMap parkings={parkings} />
            <div className="col-1"></div>
        </div>
    )
}