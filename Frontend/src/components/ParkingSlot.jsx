import { useState } from "react"
import { ParkingCard } from "./ParkingCard"
const slotStyle = {
    width: '5vw',
    height: '5vh',
    margin: '0.6vw 0vw',

}

export const ParkingSlot = ({ parking }) => {
    const [hover, setHover] = useState(false)
    return (<>
    
        <div className={`${parking.status} rounded-top-2 p-2 parkingSlot fs-6 fw-bold  `}
            style={slotStyle}
            onMouseOver={(e) => { e.preventDefault;setHover(true); }}
            onMouseLeave={(e) => { e.preventDefault; setHover(false) }}>
            
            {parking.name}
        </div>
        { hover && <ParkingCard parking={parking} />}
        </>
    )
    
}