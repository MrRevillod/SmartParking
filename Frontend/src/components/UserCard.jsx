
import { useState } from "react"

import { motion } from "framer-motion"
// import { useNavigate } from "react-router-dom"

import { UserModal } from "./UserModal"
import { Pill } from "./Pill"

export const UserCard = ({ e, item }) => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [hover, setHover] = useState(false)

    const onClickHandler = (ev) => {
        ev.preventDefault()
        setIsModalVisible(true)

    }

    return (

        <motion.div
            className="w-100   "
            variants={item}

        >
            <div onClick={onClickHandler}
                className=" userCard row rounded-1 my-1 shadow-sm bg-white border icon-blue fs-4 p-2 "
                onMouseOver={(e) => { e.preventDefault; setHover(true); }}
                onMouseLeave={(e) => { e.preventDefault; setHover(false) }}
            >
                <div className="col text-start">{e.username}</div>
                <div className="col text-start">
                    {e.vehicles[0].patente}
                </div>
                <div className="col text-start">
                    {e.active ? e.parking : <div className="text-secondary">--</div>}
                </div>
                <div className="col text-start ">
                    {e.active ? (
                        <i className="bi bi-circle-fill text-success h3"></i>
                    ) : (
                        <i className="bi bi-circle-fill text-danger h3"></i>
                    )}
                </div>
            </div>
            {
                hover && <div className="position-absolute   end-0 bottom-0 m-4">
                    <Pill bakgroundClass={"bg-secondary p-3 opacity-50 fs-5 "}>Presione para ver usuario</Pill>
                </div>
            }

            {<UserModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} user={e} />}
        </motion.div>
    )
}   