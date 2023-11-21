import { Pill } from "./Pill"
import { Vehicles } from "./Vehicles"

export const UserCardBody = ({ user }) => {
    console.log(user.role)
    const roles = {
        "ADMIN_ROLE": "Administrador",
        "USER_ROLE": "Usuario móvil",
        "TEMP_ROLE": "Usuario temporal"
    }

    return (
        <section className=" px-5 pb-5  fs-5" style={{ height: '60%' }} >
            <div className="row h-50 align-content-start justify-content-center w-100 m-0 ">
                <div className="text-center fw-bold fs-1 ">{user.username}</div>
                <div className="text-center text-secondary ">{user.email}</div>
                <div className="text-center text-secondary small mt-1 ">{user.contact}</div>
                <div className="row w-100 m-0 justify-content-center gap-2 mt-3">
                    <Pill bakgroundClass={'bg-primary'}>
                        {roles[user.role]}

                    </Pill>
                    {user.active ?
                        <Pill bakgroundClass="bg-success ">Activo</Pill> :
                        <Pill bakgroundClass="bg-danger ">Inactivo</Pill>
                    }
                </div>
            </div>
            {(user.active || user.role === "USER_ROLE") && <Vehicles user={user} />}
        </section>
    )
}