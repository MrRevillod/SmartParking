import Logo from "./Logo";
import Link from "next/link";
import Notify from "./Notify";

export default function Nabvar() {
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
                                <Link href="../" className="nav-link">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    href="../dashboard/estacionamiento"
                                    className="nav-link"
                                >
                                    Estacionamiento
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    href="../dashboard/usearch"
                                    className="nav-link"
                                >
                                    Usuarios
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    href="../dashboard/mensajes"
                                    className="nav-link"
                                >
                                    Mensajes
                                </Link>
                            </li>

                        </ul>
                        <div className="d-flex">
                            <Notify className="" />
                            <Link href="../auth/login" className="me-1">
                                <h2 className="bi bi-box-arrow-left text-light"></h2>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
