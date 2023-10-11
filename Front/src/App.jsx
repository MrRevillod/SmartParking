import { Routes, Route, useNavigate } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import useTimeout from "./lib/useTimeout";

import { AnimatePresence, motion } from "framer-motion";
import Swal from "sweetalert2";


import NavBar from "./components/Navbar";
import Home from "./dashboard/Home.jsx";
import Usearch from "./dashboard/usearch/Usearch";
import Estacionamiento from "./dashboard/estacionamiento/Estacionamiento";
import Mensajes from "./dashboard/mensajes/Mensajes";
import UsuarioId from "./dashboard/usearch/usuario/UsuarioId";
import validateSession from "./lib/useValidateSession";

import Loading from "./components/Loading";
import Toast from "./lib/Toast";

function App() {
    const [loaded, setLoaded] = useState(false);
    const navigator = useNavigate();

    async function validation() {
        setLoaded(false);
        await useTimeout(1000);
        const validated = await validateSession();
        if (!validated) {

            navigator("/login");
            Toast("Debes iniciar sesión")
        } else {
            setLoaded(true);
        }
    }

    useLayoutEffect(() => {
        validation();
        return;
    }, [navigator]);

    return (
        <>
            <NavBar></NavBar>
            <AnimatePresence>
                {loaded ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{duration:0.5 }}
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
                        </Routes>
                    </motion.div>
                ) : (
                    <Loading />
                )}
            </AnimatePresence>
        </>
    );
}

export default App;
