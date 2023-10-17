"use client";

import { useEffect, useState } from "react";
import "./user.css";
import { useParams } from "react-router-dom";

export default function UsuarioId() {
    const params = useParams()
    const [user, setUser] = useState(false);
    const [loading, setLoading] = useState(true);

    async function getUser() {
        const res = await fetch(
            `${import.meta.env.VITE_API}/users/${params.id}`,
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
    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            {loading ? <div>Loading.. </div> :
                <div className=" p-5  body-user ">
                    <div className="shadow-lg card p-4 mb-4">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img
                                    src="http://localhost:3000/images/default.jpeg"
                                    className="card-img rounded"
                                    alt="..."
                                />
                            </div>
                            <div className="col-md-8">
                                <div className="card-header mx-3 d-grid justify-content-end p-0 ">
                                    <button className="btn">
                                        <i className="bi bi-person-x-fill  h3 icon-blue"></i>
                                    </button>
                                </div>
                                <div className="card-body">
                                    <h5 className=" ml-5 fw-bold display-3 text-center icon-blue">
                                        {user.username.toUpperCase()}
                                    </h5>
                                    <div className="d-grid fs-4">
                                        <ul className="list-group ">
                                            <li className="list-group-item back-blue text-light">
                                                <b>Correo: </b> {user.email}
                                            </li>
                                            <li className="list-group-item back-blue text-light">
                                                {" "}
                                                <b>Rol: </b>
                                                {user.role === "USER_ROLE"
                                                    ? "Usuario Móvil"
                                                    : "Usuario temporal"}
                                            </li>
                                            <li className="list-group-item back-blue text-light">
                                                <b>Estado: </b>
                                                {user.active
                                                    ? "activo"
                                                    : "inactivo"}
                                            </li>
                                        </ul>

                                        <ul className="list-group back-blue mt-5">
                                            <div className=" display-6 text-center text-light fw-semibold p-4  ">
                                                Vehículos
                                            </div>
                                            
                                            <li className="list-group-item back-blue text-light " >
                                                <div className="row">
                                                    <div className="col-6 fw-bold ">Modelo</div>
                                                    <div className="col-6 fw-bold">Patente</div>
                                                </div>
                                            </li>
                                            {user.vehicles.map((v) => (
                                                <li
                                                    className="list-group-item back-blue text-light "
                                                    key={v._id}
                                                >
                                                    <div className="row">
                                                        <div className="col-6">{v.model}</div>
                                                        <div className="col-6">{v.patente}</div>
                                                    </div>

                                                </li>
                                            ))}
                                        </ul>
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
