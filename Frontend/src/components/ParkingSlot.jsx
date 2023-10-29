
import { useState } from "react"
import { UserModal } from "./UserModal"
import { Pill } from "./Pill"
import { API_URL } from "../lib/env"

const slotStyle = {
    width: '5vw',
    height: '5vh',
    margin: '0.6vw 0vw',
}

export const ParkingSlot = ({ parking }) => {
    const [view, setView] = useState(false)
    const [hover, setHover] = useState(false)
    const [user, setUser] = useState({})

    const onClickHandler = async (ev) => {
        ev.preventDefault()
        if (parking.status !== "disponible") {
            const token = localStorage.getItem('token')
            const res = await fetch(`${API_URL}/users/${parking.userId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            const response = await res.json()
            console.log(response)
            setUser(response.user)
            setView(true)
        }
    }


    return (
        <>
            <div className={`${parking.status} rounded-top-4 p-2 rounded-start-0 parkingSlot fs-6 fw-bold shadow-sm `}
                style={slotStyle}
                onMouseOver={(e) => { e.preventDefault; setHover(true); }}
                onMouseLeave={(e) => { e.preventDefault; setHover(false) }}
                onClick={onClickHandler}
            >

                {parking.name}
            </div>

            {hover && parking.status !== "disponible" &&
                <div className="position-absolute bottom-0  mb-4">
                    <Pill bakgroundClass={"bg-secondary p-3 opacity-50 fs-5 "}>
                        Presione para ver usuario
                    </Pill>
                </div>
            }
            {view && <UserModal user={user} setIsModalVisible={setView} isModalVisible={view} />}
        </>
    )
}
