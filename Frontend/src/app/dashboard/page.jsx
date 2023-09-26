"use client"

import Logo from "@/components/Logo";
import Image from "next/image";
import "./page.module.css";
import { useEffect } from "react";
import { validateSession } from "@/lib/useValidateSession";
export default function Home() {

    useEffect(()=>{
        validateSession()
        
    },[])
    return (
        <div className="">
            <div className="d-flex m-5 ">
                <div className="">
                    <div className="">
                        <h1 className="display-3 fw-bold">Smart</h1>
                    
                        <h1 className="display-3 fw-bold">Parking</h1>
                    </div>
                    <p className=" w-75">
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

                <div className="d-flex justify-items-center me-5 ">
                    <Logo
                        className="formlogo"
                        w={400}
                        h={440}
                        color={"#0D5492"}
                    />
                </div>
            </div>
        </div>
    );
}
