import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css";
import {useEffect, useState } from "react";

import Tbody from "./tbody";

const table_columns = [
    "Foto",
    "Nombre",
    "Registro",
    "Estado",
    "Ubicación",
    "Chat",
    "Administrar",
];

const patentes = ["12-12-12", "xd-xd-xd", "33-33-33"];
const estacionamiento = ["B-12", "null", "B-14"];

export default function Usearch() {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState();

    const getUsers = async() =>{

        
        const res =  await fetch(`${import.meta.env.VITE_API}/users`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        
        const response = await res.json();

        setUsers(response.users);
        setLoading(false)
    }

    useEffect(() => {
        getUsers()
    }, []);

    let results = [];

    if (!search) {
        results = users;
    } else {
        results = users.filter((dato) =>
            dato.username.toLowerCase().includes(search.toLocaleLowerCase())
        );
    }

    return (
    <>{!loading &&
            <div className="mt-4 ">
                <div className="d-flex flex-column justify-content-center">
                    <div className="text-center display-5 fw-bold mb-3  ">
                        USUARIOS
                    </div>
                    <div className="  search-container d-flex border  rounded-5 w-50 fs-5 align-self-center mt-3 mb-4  ">
                        <input
                            type="text"
                            className="searchbar bg-transparent  col-11  pe-0 border-0   px-3 py-1"
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                            value={search}
                            placeholder="Ingrese nombre de usuario"
                        />

                        <div className="searchIcon col-1 border border-0 p-2   justify-content-center align-content-center d-grid">
                            <i className="bi bi-search icon-blue"></i>
                        </div>
                    </div>

                    {users && (
                        <table className=" w-75 mt-2 align-self-center fs-5">
                            <thead className="backblue rounded-3 ">
                                <tr className="w-100 rounded-3  ">
                                    {table_columns.map((e, i) => {
                                        return (
                                            <th
                                                key={i}
                                                className="  ps-2 pe-2 text-light form-text"
                                            >
                                                {e}
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>
                            <Tbody results={results}></Tbody>
                        </table>
                    )}
                </div>
            </div>}
        </>
    );
}
