
import { useState } from "react"


import { UserModal } from "./UserModal"
import { Pill } from "./Pill"

const slotStyle = {
    width: '5vw',
    height: '5vh',
    margin: '0.6vw 0vw',
}

export const ParkingSlot = ({ parking }) => {
    const [view,setView] = useState(false)   
    const [hover, setHover] = useState(false)



    return (
        <>
            <div className={`${parking.status}  rounded-top-4 p-2 rounded-start-0 parkingSlot fs-6 fw-bold shadow-sm `}
                style={slotStyle}
                onMouseOver={(e) => { e.preventDefault; setHover(true); }}
                onMouseLeave={(e) => { e.preventDefault; setHover(false) }}
                onClick={(e) => { e.preventDefault; setView(true) }}
                >
                
                {parking.name}
            </div>
            
            {hover && parking.status !== "disponible" &&
                <div className="position-absolute bottom-0  mb-4">
                    <Pill bakgroundClass={"bg-secondary p-3 opacity-50 fs-5 "}>Presione para ver usuario</Pill>
                </div>
            }

            {view && parking.status !== "disponible" && <UserModal userId={parking.userId} setIsModalVisible={setView} isModalVisible={view} />}
        </>
    )
}
