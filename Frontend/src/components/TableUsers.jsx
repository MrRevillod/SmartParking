import { motion } from "framer-motion"
import { UserCard } from "./UserCard"

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


export const TableUsers = ({ table_columns, usersFiltered }) => {
    


    return (
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
                {usersFiltered.map((e) => (
                    <UserCard key={e._id} e={e} item={item} />

                ))}
            </div>

           

        </motion.div>
    )
}