
const headStyle = {
    borderRadius: "5px",
    padding: "10px 10px 0 10px",
    margin: "1vw",
    gap: "10vw",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    alignItems: "left",
    fontSize: "1.5rem",
    fontWeight: "bold",
    fontFamily: "sans-serif",
    boxShadow: "6px 6px 15px 0px rgba(0,0,0,0.3)",
    cursor: "pointer",
    minWidth: "100%",
    border:"1px gray solid"
}

import Cardy from "./cardy";
export default function Peticiones({reservas}) {


    return (
        <div className=" w-100 justify-content-center d-grid ">
            <div className="text-center display-2 fw-bold m-3">Peticiones</div>
            
            <div className=" shadow" style={headStyle} >
                <p className="col-4 ">Nombre</p>
                <p className="col-4 ">Patente</p>
                <p className="col-4">Estacionamiento</p>
            </div>
            {reservas.length >= 0 && reservas.map((reserva) => Cardy(reserva))}
        </div>
    );
}
