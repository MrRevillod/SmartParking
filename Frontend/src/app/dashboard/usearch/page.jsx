"use client";

import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css";
import { Suspense, useEffect, useState } from "react";
import Loading from "../loading";
import Tbody from "./tbody";

const table_columns = [
    "Foto",
    "Nombre",
    "Registro",
    "Estado",
    "Ubicación",
    "Chat",
    "Administrar"
];

const patentes = ["12-12-12", "xd-xd-xd", "33-33-33"];
const estacionamiento = ["B-12", "null", "B-14"];

export default function Page() {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState();

    useEffect(() => {
        async function getUsers() {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/users`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const response = await res.json();
            setUsers(response.users);

            return users;
        }
        getUsers();
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
        <>
            <div className="mt-4 ">
                <div className="d-flex flex-column justify-content-center">
                    <div className="text-center display-5 fw-bold mb-3  ">
                        USUARIOS
                    </div>
                    <div className=" d-flex border rounded-1 w-25 align-self-center mt-3 ">
                        <input
                            type="text"
                            className="searchbar x col-11 border-0 pe-0  small p-2"
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                            value={search}
                            placeholder="Ingrese nombre de usuario"
                        />

                        <div className="searchIcon col-1 border border-0 p-2  justify-content-end d-grid">
                            <i className="bi bi-search icon-blue"></i>
                        </div>
                    </div>

                    {users && (
                        <table className=" w-75 mt-2 align-self-center">
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
                    ) }
                </div>
            </div>
        </>
    );
}
