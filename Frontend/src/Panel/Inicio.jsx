
import "./globals.css"
import { Logo } from "../components/Logo"

export const Inicio = () => {

    return (
        <div className="home ">
            <div className="row mx-5 h-100">
                <div className="col-6 d-grid align-content-center mb-5">
                    <div className="">
                        <h1 className="display-1  fw-bold">Smart</h1>

                        <h1 className="display-1 fw-bold">Parking</h1>
                    </div>

                    <p className=" w-100 h4 mb-4">
                        Smart parking es un software semi autónomo del manejo
                        del espacio de la institución de UCT de la ciudad de
                        Temuco. Creado en base Next.js para evitar tiempos de
                        carga largos Smart parking fue diseñado para un uso
                        rápido y sin problemas, ingresar, buscar, reservar,
                        cancelar, son algunas de las capacidades que contiene la
                        aplicación. Con un administrador encargado del flujo del
                        estacionamiento y el que recibe las solicitudes de las
                        reservas, Smart parking solo es más segura al estar
                        conectada con la seguridad del establecimiento
                        permitiendo que los guardias de la caseta del
                        establecimiento sepan el estado del estacionamiento y
                        verificar quién entra y quién sale.
                    </p>
                </div>

                <div className=" col-6 bg-white    d-grid  h-100 justify-content-center align-content-center  ">
                    <Logo
                        w={500}
                        h={540}
                        color={"#0D5492"}
                        className=""
                    />
                </div>
            </div>
        </div>
    )
}
