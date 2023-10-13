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
                                    <h5 className="card-title ml-5 display-5 text-center">
                                        {user.username}
                                    </h5>
                                    <div className="d-grid">
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
                                        <h5 className=" text-center  mb-0 mt-3">
                                            Vehículos
                                        </h5>
                                        <ul className="list-group ">
                                            {user.vehicles.map((v) => (
                                                <li
                                                    className="list-group-item back-blue text-light"
                                                    key={v._id}
                                                >
                                                    {v.model} | {v.patente}
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
