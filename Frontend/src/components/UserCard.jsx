
import { motion } from "framer-motion"
// import { useNavigate } from "react-router-dom"

export const UserCard = ({ e, item }) => {
    // const router = useNavigate()
    return (

        <motion.li

            className="w-100  "
            // initial={{ y: 60 }}
            // animate={{ y: 0 }}
            // exit={{ y: 60 }}
            // transition={{ duration: 0.1 }}
            variants={item}
        >
            <div
                key={e._id}
                className=" userCard row rounded-1 my-1 shadow-sm bg-white border icon-blue fs-4 p-2 "
            >
                {/* <div className="col text-start ">
                    <img
                        src={e.profilePicture}
                        className="rounded-circle profile-img"
                    ></img>
                </div> */}
                <div className="col text-start">{e.username}</div>
                <div className="col text-start">
                    {e.vehicles[0].patente}
                </div>
                <div className="col text-start">
                    {e.active ? e.parking : "desconocida"}
                </div>
                <div className="col text-start ">
                    {e.active ? (
                        <i className="bi bi-circle-fill text-success h3"></i>
                    ) : (
                        <i className="bi bi-circle-fill text-danger h3"></i>
                    )}
                </div>
                {/* <div className="col text-start">
                    <button className="btn bt " onClick={(ev) => {
                        ev.preventDefault()
                        router(`/dashboard/usearch/${e._id}`)
                    }}>
                        <i className="bi bi-pencil-square  icon-blue h-75  h3" />
                    </button>
                </div> */}
            </div>
        </motion.li>
    )
}   