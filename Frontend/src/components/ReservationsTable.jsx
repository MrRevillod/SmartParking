import { Cardy } from "../app/dashboard/stats/Cardy"

export const ReservationsTable = ({ reservas }) => {

    return (
        <>
            <div className="row  m-0 w-100 fs-4 rounded-top pt-2 icon-blue backblue text-light  overflow-hidden   border-2    ">
                <p className="col-3 ">Nombre</p>
                <p className="col-3 ">Patente</p>
                <p className="col-3 ">Estacionamiento</p>
                <p className="col-3 ">Estado</p>
            </div>
            <Cardy reservas={reservas} />
        </>
    )
} 