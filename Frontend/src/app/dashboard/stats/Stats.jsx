
import "./Stats.css"

import Cardy from "./Cardy"

export const Stats = ({ reservas }) => {
    return (
        <div className="col w-full row justify-content-center  ">
            <div className="text-center display-2 fw-bold m-3 mt-5">Reservas</div>
            <p className="text-center fs-4 ">Listado de solicitudes de reserva</p>

            {reservas.length > 0 ? <div className="w-75 mt-5  ">
                <div className="row  w-100 fs-4 rounded-top pt-2 icon-blue backblue text-light  overflow-hidden   border-2    ">
                    <p className="col-3     ">Nombre</p>
                    <p className="col-3    ">Patente</p>
                    <p className="col-3    ">Estacionamiento</p>
                    <p className="col-3    ">Estado</p>
                </div>
                <Cardy reservas={reservas} />
            </div> : <div className="text-center display-4 text-danger fw-bold">No hay Reservas </div>}

        </div>
    )
}

