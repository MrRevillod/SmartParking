import Logo from "@/components/Logo"
import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className=''>

      <div className="d-flex m-5">

        <div className="p-5">
                                <div className="titulo">
                                <h1>Smart</h1>
                                </div>
                              <div className="titulo1">
                                <h1>Parking</h1>
                              </div>
          <p>
          Smart parking es un software semi autónomo del manejo del espacio de la institución de UCT de la ciudad de Temuco. Creado en base Next.js para evitar tiempos de carga largos Smart parking fue diseñado
          para un uso rápido y sin problemas, ingresar, buscar, reservar, cancelar, son algunas de las capacidades que contiene la aplicación. Con un administrador encargado del flujo del estacionamiento y el que recibe las solicitudes de las reservas,
          Smart parking solo es más segura al estar conectada con la seguridad del establecimiento permitiendo que los guardias de la caseta del establecimiento sepan el estado del estacionamiento y verificar quién entra y quién sale.
          </p>
        </div>
        
        <div className="d-flex justify-items-center">
          <Logo className="formlogo" w={500} h={550} color={"#0D5492"} />
        </div>

      </div>
    </div>
  )
}
