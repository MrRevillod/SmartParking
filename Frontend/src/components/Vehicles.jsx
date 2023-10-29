
export const Vehicles = ({ user }) => {

    return (
        <div className="h-50">

            <div className="fs-3 pb-2 text-center fw-semibold m-0 p-0">
                Vehículos
            </div>
            <section className="h-75 rounded-2 overflow-hidden w-100">
                <div className="row back-blue p-1 fw-semibold  w-100 m-0">
                    <div className="col text-light">Patente</div>
                    <div className="col text-light">Modelo</div>
                    <div className="col text-light">Año</div>
                </div>
                <div className="h-75 overflow-scroll">
                    {user.vehicles.map((e) => {
                        return (
                            <div key={e._id} className="row w-100 shadow-sm m-0 my-1 rounded border p-1" >
                                <div className="col text-truncate">{e.patente}</div>
                                <div className="col text-truncate">{e.model === 'temp' ? '...' : e.model}</div>
                                <div className="col text-truncate">{e.year === 'temp' ? '...' : e.year}</div>
                            </div>
                        )
                    })}

                </div>

            </section>
        </div>
    )

}