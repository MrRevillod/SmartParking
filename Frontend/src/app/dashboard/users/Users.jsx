
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

import { UserCard } from "../../../components/UserCard"

import "./Style.css"
import "bootstrap-icons/font/bootstrap-icons.css"

const table_columns = [
    "Nombre",
    "Registro",
    "Ubicación",
    "Estado",
]

const list = {

    visible: {
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.05,
        },
    },
    hidden: {
        transition: {
            when: "afterChildren",
        },
    },
}

const item = {
    visible: { opacity: 1, },
    hidden: { opacity: 0, },
}

export const Users = () => {

    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState()

    const getUsers = async () => {
        const res = await fetch(`${import.meta.env.VITE_API}/users`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        const response = await res.json()

        setUsers(response.users)
        setLoading(false)
    }

    useEffect(() => {
        getUsers()
    }, [])

    let results = []
    if (!search) {
        results = users
    } else {
        results = users.filter((dato) =>
            dato.username.toLowerCase().includes(search.toLocaleLowerCase())
        )
    }

    return (
        <>{!loading &&
            <div className="pt-4" style={{ height: "vh" }}>
                <div className="row justify-content-center" >
                    <div className="col-7 mx-4 justify-content-center" >

                        <div className="col text-center align-content-center row mb-4 mt-5">
                            <h1 className="fw-bold display-4">Administración de Usuarios</h1>
                        </div>

                        <div className="search-container d-flex border rounded-2 w-75 fs-5 mt-2 mb-4">
                            <input
                                type="text"
                                value={search}
                                placeholder="Ingrese nombre de usuario"
                                onChange={(e) => { setSearch(e.target.value) }}
                                className="searchbar bg-transparent col-11 pe-0 border-0 px-3 py-1"
                            />

                            <div className="searchIcon col-1 border border-0 p-2     justify-content-center align-content-center d-grid">
                                <i className="bi bi-search icon-blue"></i>
                            </div>
                        </div>

                        {users && (
                            <motion.div className="row w-full justify-content-center list-unstyled"

                                initial="hidden"
                                animate="visible"
                                variants={list}

                            >
                                <div className="row w-full justify-content-center">
                                    <motion.div variants={item} className=" row back-blue p-2 w-100 rounded-top-3 fs-5 " >
                                        {table_columns.map((e, i) => {
                                            return (
                                                <div
                                                    key={i}
                                                    className=" col ps-2  text-start text-light fw-bold "
                                                >
                                                    {e}
                                                </div>
                                            )
                                        })}

                                    </motion.div>
                                </div>
                                <div className="overflow-scroll border-bottom border-1 row w-full justify-content-center" style={{ maxHeight: '55vh' }}>
                                    {results.map((e) => (
                                        <UserCard key={e._id} e={e}  item={item} />

                                    ))}
                                </div>

                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        }
        </>
    )
}
