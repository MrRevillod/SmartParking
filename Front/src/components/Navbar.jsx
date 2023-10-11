
import Logo from "./Logo";
import { Link } from "react-router-dom";
import Notify from "./Notify";
import { useNavigate } from "react-router-dom";
import Toast from "../lib/Toast";
import Swal from "sweetalert2";
import "./Navbar.css"
export default function Nabvar() {

    const logout = async () =>{
        const token = localStorage.getItem("token")
        const res = await fetch(`${import.meta.env.VITE_API}/auth/logout`,{
            method:"POST",
            headers:{"Authorization":`Bearer ${token}`}
        })

        const response = await res.json()
        if(res.ok){
            localStorage.removeItem("token");
            router('/login')
            Toast("Has salido correctamente")
        }else{
            console.log(res.text)
        }

        
    }

    const router = useNavigate()
    const onClickHandler = (e) => {
        e.preventDefault()
        Swal.fire({ 
            title:"¿Desea cerrar sesión?",

            confirmButtonText:"Salir",
            confirmButtonColor:"",


            showCancelButton:true,
            cancelButtonText:"Cancelar",
            cancelButtonColor:"red",

            customClass:{
                confirmButton:"back-blue"
            }

        }).then((res) =>{
            if(res.isConfirmed){
                logout()
            }
        })
        
        
        
    };
    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-dark back-blue ">
                <div className="container-fluid">
                    <a className="navbar-brand" href="">
                        <Logo
                            className="formlogo"
                            w={50}
                            h={50}
                            color={"#FFFFFF"}
                        />
                    </a>
                    <div className="collapse navbar-collapse" id="mynavbar">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link to="/dashboard" className="nav-link">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to="/dashboard/estacionamiento"
                                    className="nav-link"
                                >
                                    Estacionamiento
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to="/dashboard/usearch"
                                    className="nav-link"
                                >
                                    Usuarios
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to="/dashboard/mensajes"
                                    className="nav-link"
                                >
                                    Mensajes
                                </Link>
                            </li>
                        </ul>
                        <div className="d-flex">
                            <Notify className="" />
                            <Link
                                
                                onClick={(e) => onClickHandler(e)}
                                className="me-1"
                            >
                                <h2 className="bi bi-box-arrow-left text-light"></h2>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
