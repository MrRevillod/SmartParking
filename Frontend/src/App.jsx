import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useLayoutEffect, useState } from "react";
import useTimeout from "./lib/useTimeout";

import { motion } from "framer-motion";

import NavBar from "./components/Navbar";
import Home from "./dashboard/Home.jsx";
import Usearch from "./dashboard/usearch/Usearch";
import Estacionamiento from "./dashboard/estacionamiento/Estacionamiento";
import Mensajes from "./dashboard/mensajes/Mensajes";
import UsuarioId from "./dashboard/usearch/usuario/UsuarioId";
import validateSession from "./lib/useValidateSession";
import Peticiones from "./dashboard/Peticiones/Peticiones";

import Loading from "./components/Loading";
import Toast from "./lib/Toast";
import { disconnectSocket, getNew, getPeticiones, initiateSocket } from "./socket";

function App() {
    const [loaded, setLoaded] = useState(false);
    const [reservasM, setReservasM] = useState([]);
    var reservas = [];

    const navigator = useNavigate();

    async function validation() {
        setLoaded(false);
        await useTimeout(1000);
        const validated = await validateSession();
        if (!validated) {
            navigator("/login");
            Toast({ msg: "Debes iniciar sesión" });
        } else {
            setLoaded(true);
        }
    }

    useLayoutEffect(() => {

        validation();
        
    }, [navigator]);

    async function setData(data) {

        // Identificar las reservas que han cambiado
        const reservasCambiadas = reservas.filter(reserva => !data.includes(reserva));
        
        // Actualizar las reservas con los nuevos datos
        
        console.log(data)
        // Mostrar notificaciones para las reservas cambiadas
        for (const reserva of reservasCambiadas) {
          await Toast({ msg: `La reserva de ${reserva.username} ya no está activa` });
          console.log(reserva)
        }
        reservas = data;
        setReservasM(reservas)
      }
      


    useEffect(() => {
        reservas = []
        initiateSocket()
        getPeticiones((err,data) => {
            if(err) return console.log(err);
            setData(data)
        })

        getNew(async(err,data) => {
            if(err) return console.log(err);
            await Toast({msg:"Tienes una nueva petición"})
            reservas = [...reservasM,data]
            setReservasM(reservas)
        })

        return () => {
            disconnectSocket()
        }
    }, []);



    return (
        <>
            <NavBar></NavBar>

                {loaded ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        exit={{ opacity: 0 }}
                    >
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/usearch" element={<Usearch />} />
                            <Route
                                path="/usearch/:id"
                                element={<UsuarioId />}
                            />
                            <Route
                                path="/estacionamiento"
                                element={<Estacionamiento />}
                            />

                            <Route path="/mensajes" element={<Mensajes />} />
                            <Route path="/usuario" element={<Mensajes />} />
                            <Route
                                path="/peticiones"
                                element={<Peticiones reservas={reservasM} />}
                            />
                        </Routes>
                    </motion.div>
                ) : (
                    <Loading />
                )}
        </>
    );
}

export default App;
