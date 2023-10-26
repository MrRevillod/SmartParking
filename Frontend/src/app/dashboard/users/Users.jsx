import { useEffect, useState } from "react"

import { Header } from "../../../components/Header"
import { Filters } from "../../../components/Filters"

import "./Style.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import { SearchBar } from "../../../components/SearchBar"
import { TableUsers } from "../../../components/TableUsers"

const table_columns = [
    "Nombre",
    "Registro",
    "Ubicación",
    "Estado",
]

function orderByUsername(usuarios) {
    // Utiliza el método sort para ordenar el arreglo de usuarios según la propiedad "username".
    usuarios.sort((a, b) => {
        const usernameA = a.username.toLowerCase(); // Convierte a minúsculas para asegurarse de que la comparación sea insensible a mayúsculas.
        const usernameB = b.username.toLowerCase();

        if (usernameA < usernameB) {
            return -1;
        }
        if (usernameA > usernameB) {
            return 1;
        }
        return 0;
    });
}




export const Users = () => {

    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState()
    const [filters, setFilters] = useState({
        active: true,
        inactive: true,
    })

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

    const filterUsers = (users) => {
        users && orderByUsername(users)
        return users?.sort().filter((user) => (
            user.username.toLowerCase().includes(search.toLocaleLowerCase()) &&
            (user.active && filters.active || !user.active && filters.inactive
            )
        ))
    }

    useEffect(() => {
        getUsers()
    }, [])


    const usersFiltered = filterUsers(users)

    return (
        <>{!loading &&
            <div className="pt-4" style={{ height: "vh" }}>
                <div className="row justify-content-center" >
                    <div className="col-7 mx-4 justify-content-center" >
                        <div className="col text-center align-content-center row mb-4 mt-5">
                            <h1 className="fw-bold display-4">Administración de Usuarios</h1>
                        </div>
                        <div className="  row p-4">
                            <SearchBar search={search} setSearch={setSearch}></SearchBar>
                            <Header >
                                <Filters setFilters={setFilters} filters={filters}  ></Filters>
                            </Header>
                        </div>
                        {users && (
                            <TableUsers table_columns={table_columns} usersFiltered={usersFiltered} />
                        )}
                    </div>
                </div>
            </div>
        }
        </>
    )
}
