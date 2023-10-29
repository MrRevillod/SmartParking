
import Swal from "sweetalert2"
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"

import { Logo } from "./Logo"
import { Toast } from "../lib/Toast"
import { socket } from "../lib/socket"
import { API_URL } from "../lib/env.js"

import "./Navbar.css"

export const Navbar = () => {

    const router = useNavigate()

    const logout = async () => {

        const token = localStorage.getItem("token")
        const res = await fetch(`${API_URL}/auth/logout`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
        })

        if (res.ok) {
            localStorage.removeItem("token")
            await Toast({ msg: "Has salido correctamente" })
            socket.disconnect()
            router("/login")

        }
    }

    const onClickHandler = (e) => {
        e.preventDefault()
        Swal.fire({
            title: "¿Desea cerrar sesión?",

            confirmButtonText: "Salir",
            confirmButtonColor: "",

            showCancelButton: true,
            cancelButtonText: "Cancelar",
            cancelButtonColor: "red",

            customClass: {
                confirmButton: "back-blue",
            },
        }).then((res) => {
            if (res.isConfirmed) {
                logout()
            }
        })
    }

    return (
        <>
            <motion.nav
                initial={{ y: -250 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3, }}
                className="navbar navbar-expand-sm navbar-dark back-blue ">
                <div className="container-fluid p-3">
                    <a className="navbar-brand" href="/dashboard">
                        <Logo
                            className="formlogo "
                            w={60}
                            h={60}
                            color={"#FFFFFF"}
                        />
                    </a>
                    <div className="collapse navbar-collapse" id="mynavbar">
                        <ul className="navbar-nav me-auto gap-3 fs-5">
                            <li className="nav-item">
                                <Link to="/dashboard" className="nav-link ">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to="/dashboard/parking"
                                    className="nav-link"
                                >
                                    Estacionamiento
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to="/dashboard/users"
                                    className="nav-link"
                                >
                                    Usuarios
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to={"/dashboard/stats"}
                                    className="nav-link"
                                >
                                    Estadísticas
                                </Link>
                            </li>
                        </ul>
                        <div className="d-flex">
                            <Link
                                onClick={(e) => onClickHandler(e)}
                                className="me-1"
                            >
                                <h2 className="bi bi-box-arrow-left text-light"></h2>
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.nav>
        </>
    )
}
