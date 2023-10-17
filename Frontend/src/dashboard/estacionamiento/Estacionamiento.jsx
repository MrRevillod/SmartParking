import { useEffect } from "react";
import { ParkingMap } from "../../components/ParkingMap";
import { StatusCircle } from "../../components/StatusCircle";

import { useState  } from "react"   
import "./Estacionamiento.css"
import { Legend } from "../../components/Legend";
export default function Estacionamiento({parkings}) {
    const [disponibles,setDisponibles] = useState(0)
    const [reservados,setReservados] = useState(0)
    const [ocupados,setOcupados] = useState(0)

    useEffect(() =>{
        const total = parkings.length
        const disp = parkings.filter(parking => parking.status === "disponible").length
        const res = parkings.filter(parking => parking.status === "reservado").length
        const ocu = parkings.filter(parking => parking.status === "ocupado").length
        setDisponibles(disp * 100 /total)
        setReservados(res * 100 /total)
        setOcupados(ocu * 100 /total)

    },[parkings])
    
    return (
		<div className='row w-100'>
            <div className='col d-grid align-content-center justify-content-center   '> 
                <h1 className="text-center display-3 fw-bold mt-5">Estacionamiento</h1>
                <p className="text-center fs-5  ">Estado de los estacionamientos</p>
                
                <div className="row m-4 mb-0 border rounded-top-4">
                    <Legend status={"ocupado"} /> 
                    <Legend status={"disponible"} /> 
                    <Legend status={"reservado"} /> 
                </div>
                <div className="row m-4 mt-0 rounded-bottom-4 back-blue ">
                    <StatusCircle  percent={ocupados}  label={"ocupado"} />
                    <StatusCircle percent={disponibles}  label={"disponible"}/>
                    <StatusCircle percent={reservados}  label={"reservado"}/>
                </div>
                

                
            </div>
            <ParkingMap parkings={parkings} />
         </div>
	)
}