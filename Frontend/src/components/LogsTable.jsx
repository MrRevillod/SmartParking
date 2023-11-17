

export const LogsTable = ({ logs }) => {

    return (
        <div className="m-1">
            <div className="back-blue text-light  border-bottom-0 p-2 fw-bold border">Registro de ingresos</div>
            <div className="row m-0 w-100 text-light back-blue ">
                <div className="col border "> Usuario </div>
                <div className="col border border-start-0"> Fecha </div>
            </div>
            <div className="overflow-scroll  " style={{ maxHeight: '55vh' }}>
                {
                    logs.map((log) => (

                            <div className="row m-0 w-100  border mb-1" key={log._id}>
                                <div className="col"> {log.username} </div>
                                <div className="col"> {log.access} </div>
                            </div>

                    ))
                }
            </div>
        </div>

    )

}