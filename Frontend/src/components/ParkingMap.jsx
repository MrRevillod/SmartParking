import { ParkingSlot } from "./ParkingSlot"

const mapStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '0rem',
    maxHeight: '70vh',
}



export const ParkingMap = ({ parkings }) => {
    return (
        <div style={mapStyles} className="col m-5 px-5"  >
            {parkings && parkings.map((parking) => {
                return (
                    <ParkingSlot   parking={parking} key={parking._id}/>
                )
            })}
        </div >
    )
}