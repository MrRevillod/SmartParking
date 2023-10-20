

import { useEffect, useState, } from "react";
import { useNavigate } from "react-router-dom";


import Toast from "../../../lib/Toast";

import "./user.css";
import Swal from "sweetalert2";
import { Table } from "../../../components/table";

export default function UsuarioId({ id }) {


    const [user, setUser] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useNavigate()


    const deleteUser = async () => {
        const res = await fetch(`${import.meta.env.VITE_API}/users/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })

        if (res.ok) {
            await Toast({ msg: "Usuario eliminado correctamente" })
            router("/dashboard/usearch")
        }
    }

    const onClickHandler = async (e) => {
        e.preventDefault()
        Swal.fire({
            title: "¿Desea eliminar este usuario?",
            confirmButtonText: "Eliminar",
            confirmButtonColor: "",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            cancelButtonColor: "red",
            customClass: {
                confirmButton: "back-blue",
            },
        }).then(async (res) => {
            if (res.isConfirmed) {
                deleteUser()
            }

        })


    }

    useEffect(() => {
        async function getUser() {
            const res = await fetch(
                `${import.meta.env.VITE_API}/users/${id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            const data = await res.json();
            console.log(data.user);
            setUser(data.user);
            setLoading(false)
        }
        getUser();
    }, [id]);

    return (
        <>
            {loading ? <div>Loading.. </div> :
                <div className=" p-5  " style={{height:"60vh"}}>
                    <div className="shadow-sm  card p-4 mb-4 overflow-scroll">
                        <div className="row">
                            <div className="col-4">
                                <img
                                    src={user.profilePicture}
                                    className="card-img rounded"
                                    alt="..."
                                />
                            </div>
                            <div className="col-8">
                                <div className="card-header mx-3 d-grid justify-content-end p-0 ">
                                    <button className="btn" onClick={onClickHandler} >
                                        <i className="bi bi-person-x-fill  h3 icon-blue"></i>
                                    </button>
                                </div>
                                <div className="card-body">
                                    <h5 className=" ml-5 fw-bold fs-4 text-center icon-blue">
                                        {user.username.toUpperCase()}
                                    </h5>
                                    <div className="d-grid fs-4">
                                        <div className="row icon-blue border rounded-2 p-3 ">
                                            <div className="col-3 fw-bold text-start">Correo: </div>
                                            <div className="col-7 text-start">{user.email}</div>

                                            <div className="col-3 fw-bold text-start">Rol: </div>
                                            <div className="col-7 text-start">{user.role === "USER_ROLE"
                                                ? "Usuario Móvil"
                                                : "Usuario temporal"}</div>

                                            <div className="col-3 fw-bold text-start">Correo: </div>
                                            <div className="col-7 text-start"> {user.active
                                                ? "activo"
                                                : "inactivo"}</div>

                                        </div>
                                        <div className=" fs-3 text-center fw-semibold p-2 icon-blue  ">
                                            Vehículos
                                        </div>
                                        <Table data={user.vehicles} columns={["Modelo", "Patente"]} />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
