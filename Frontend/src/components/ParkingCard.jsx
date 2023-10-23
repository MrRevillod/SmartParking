
export const ParkingCard = ({ parking }) => {

    return (
        <div className="position-absolute bottom-0 mb-5  rounded left-0 text-black" >
            <div className="row " style={{ width: "30vw", height: "3vh" }}>
                <div className="col"><b> nombre:</b>   <br /> {parking.name}</div>
                <div className="col"><b> estado: <br /> </b> {parking.status}</div>
                <div className="col"><b> UserID:</b> {parking.userId}</div>
            </div>
        </div>
    )
}